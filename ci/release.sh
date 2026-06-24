#!/usr/bin/env bash
#
# release.sh — a self-contained replacement for `smooth-release`.
#
# Why this exists:
#   `smooth-release` (https://github.com/buildo/smooth-release) talks to the
#   GitHub API with a raw token and runs `npm publish` non-interactively. Both
#   break under modern auth: new GitHub fine-grained / 2FA tokens are rejected
#   by its old API client (buildo/smooth-release#120), and `npm publish` fails
#   when npm 2FA requires an OTP. This script reproduces the exact same release
#   flow using the `gh` CLI (which manages its own auth + 2FA) and plain
#   yarn/npm commands, and prompts for an npm OTP when needed.
#
# It replicates the default `smooth-release` run for this repo's .smooth-releaserc:
#   1. validations   — branch, clean tree, in sync w/ remote, npm + gh auth
#   2. npm-version    — compute next version from GitHub issue labels, bump package.json
#   3. changelog      — prepend a new CHANGELOG.md section (gh-changelog-generator format)
#   4. commit & push  — commit, tag vX.Y.Z, push commit + tag
#   5. gh-release     — create the GitHub Release for the new tag
#   6. npm-publish    — build + npm publish (with OTP prompt/retry for 2FA)
#
# Usage:
#   ci/release.sh [options]
#     --version X.Y.Z   Use an explicit version instead of computing one
#     --otp 123456      npm one-time password (2FA); will prompt if omitted & needed
#     --dry-run         Print every step, change nothing, push nothing, publish nothing
#     --yes             Don't ask for confirmation before the version bump
#     --skip-publish    Do everything except `npm publish` (useful for testing)
#     -h, --help        Show this help
#
set -euo pipefail

# ----------------------------------------------------------------------------
# Config — mirrors defaultConfig + .smooth-releaserc in smooth-release
# ----------------------------------------------------------------------------
RELEASE_BRANCH="master"
NPM_REGISTRY="https://registry.npmjs.org/"
CHANGELOG_FILE="CHANGELOG.md"

# Label → changelog section mapping (smooth-release defaults).
BREAKING_LABELS=("breaking")
BUG_LABELS=("bug" "defect")
BREAKING_TITLE="#### Breaking:"
FEATURE_TITLE="#### New features:"
BUG_TITLE="#### Fixes (bugs & defects):"

# ----------------------------------------------------------------------------
# Args
# ----------------------------------------------------------------------------
MANUAL_VERSION=""
OTP=""
DRY_RUN=false
ASSUME_YES=false
SKIP_PUBLISH=false

while [[ $# -gt 0 ]]; do
  case "$1" in
    --version) MANUAL_VERSION="$2"; shift 2 ;;
    --version=*) MANUAL_VERSION="${1#*=}"; shift ;;
    --otp) OTP="$2"; shift 2 ;;
    --otp=*) OTP="${1#*=}"; shift ;;
    --dry-run) DRY_RUN=true; shift ;;
    --yes|-y) ASSUME_YES=true; shift ;;
    --skip-publish) SKIP_PUBLISH=true; shift ;;
    -h|--help) sed -n '2,40p' "$0"; exit 0 ;;
    *) echo "Unknown option: $1" >&2; exit 1 ;;
  esac
done

# ----------------------------------------------------------------------------
# Pretty output
# ----------------------------------------------------------------------------
if [[ -t 1 ]]; then
  BOLD=$'\e[1m'; DIM=$'\e[2m'; RED=$'\e[31m'; GREEN=$'\e[32m'; YELLOW=$'\e[33m'; BLUE=$'\e[34m'; RESET=$'\e[0m'
else
  BOLD=""; DIM=""; RED=""; GREEN=""; YELLOW=""; BLUE=""; RESET=""
fi
title() { echo; echo "${BOLD}${BLUE}==> $*${RESET}"; }
ok()    { echo "  ${GREEN}✔${RESET} $*"; }
warn()  { echo "  ${YELLOW}!${RESET} $*"; }
die()   { echo "${RED}✘ $*${RESET}" >&2; exit 1; }
# run: echo a command and execute it, or just echo it when --dry-run.
run() {
  if $DRY_RUN; then echo "  ${DIM}[dry-run]${RESET} $*"; else echo "  ${DIM}\$ $*${RESET}"; eval "$@"; fi
}

cd "$(git rev-parse --show-toplevel)"

# ----------------------------------------------------------------------------
# 0. Required tooling
# ----------------------------------------------------------------------------
title "Check required tools"
for tool in git node npm yarn gh jq; do
  command -v "$tool" >/dev/null 2>&1 || die "Missing required tool: '$tool'. Please install it and retry."
done
ok "git, node, npm, yarn, gh, jq are installed"

# ----------------------------------------------------------------------------
# 1. Validations  (smooth-release: validations task)
# ----------------------------------------------------------------------------
title "Run validations"

current_branch=$(git rev-parse --abbrev-ref HEAD)
[[ "$current_branch" == "$RELEASE_BRANCH" ]] || die "Not on '$RELEASE_BRANCH' (on '$current_branch')."
ok "On branch $RELEASE_BRANCH"

git fetch --tags --quiet
ok "Fetched from remote"

[[ -z "$(git status --porcelain)" ]] || die "Working tree has uncommitted or untracked changes. Commit or stash them first."
ok "Working tree is clean"

local_sha=$(git rev-parse @)
remote_sha=$(git rev-parse @{u})
base_sha=$(git merge-base @ @{u})
if [[ "$local_sha" != "$remote_sha" ]]; then
  if [[ "$local_sha" == "$base_sha" ]]; then die "Local branch is behind remote. Pull first."
  elif [[ "$remote_sha" == "$base_sha" ]]; then die "Local branch is ahead of remote. Push first."
  else die "Local and remote have diverged."; fi
fi
ok "In sync with remote"

npm_user=$(npm whoami --registry "$NPM_REGISTRY" 2>/dev/null || true)
[[ -n "$npm_user" ]] || die "Not logged in to npm. Run: npm login --registry $NPM_REGISTRY"
ok "npm credentials valid (logged in as $npm_user)"

gh auth status >/dev/null 2>&1 || die "Not authenticated with GitHub. Run: gh auth login"
repo_slug=$(gh repo view --json nameWithOwner -q .nameWithOwner)
ok "GitHub auth valid ($repo_slug)"

# ----------------------------------------------------------------------------
# 2. Compute next version  (smooth-release: npm-version task)
#    beta (<1.0.0):  breaking -> minor, otherwise -> patch
#    stable (>=1.0): breaking -> major, otherwise -> patch
# ----------------------------------------------------------------------------
title "Compute next version"

current_version=$(node -p "require('./package.json').version")
last_tag="v${current_version}"
ok "Current version: $current_version"

if [[ -n "$MANUAL_VERSION" ]]; then
  next_version="$MANUAL_VERSION"
  ok "Using manual version: $next_version"
else
  # Date of the last version tag — issues closed after it are "unpublished".
  if git rev-parse -q --verify "refs/tags/${last_tag}" >/dev/null; then
    since_date=$(git log -1 --format=%cI "${last_tag}")
  else
    warn "Tag ${last_tag} not found locally; considering all closed issues."
    since_date=""
  fi

  # Is there a closed issue labeled "breaking" since the last tag?
  breaking_label="${BREAKING_LABELS[0]}"
  if [[ -n "$since_date" ]]; then
    breaking_count=$(gh issue list --repo "$repo_slug" --state closed --label "$breaking_label" \
      --search "closed:>=${since_date}" --json number --jq 'length' --limit 200)
  else
    breaking_count=$(gh issue list --repo "$repo_slug" --state closed --label "$breaking_label" \
      --json number --jq 'length' --limit 200)
  fi

  # is this a beta (< 1.0.0)?
  is_beta=$(node -p "require('semver').lt('$current_version','1.0.0') ? 'yes':'no'" 2>/dev/null \
    || node -p "(s=>{const[a]=s.split('.');return +a<1?'yes':'no'})('$current_version')")

  if [[ "$breaking_count" -gt 0 ]]; then
    [[ "$is_beta" == "yes" ]] && level="minor" || level="major"
    ok "Found $breaking_count breaking issue(s) since $last_tag → $level bump"
  else
    level="patch"
    ok "No breaking issues since $last_tag → patch bump"
  fi

  # Use npm itself to do the semver math (writes nothing yet — we read & revert).
  next_version=$(node -e "const s=require('semver');process.stdout.write(s.inc('$current_version','$level'))" 2>/dev/null || true)
  if [[ -z "$next_version" ]]; then
    # Fallback semver bump without the semver package.
    IFS='.' read -r MA MI PA <<< "$current_version"
    case "$level" in
      major) next_version="$((MA+1)).0.0" ;;
      minor) next_version="${MA}.$((MI+1)).0" ;;
      patch) next_version="${MA}.${MI}.$((PA+1))" ;;
    esac
  fi
fi

new_tag="v${next_version}"
[[ "$next_version" != "$current_version" ]] || die "Computed version equals current version ($current_version)."
git rev-parse -q --verify "refs/tags/${new_tag}" >/dev/null && die "Tag ${new_tag} already exists." || true

echo
echo "  ${BOLD}${current_version} → ${next_version}${RESET}"
if ! $ASSUME_YES; then
  read -r -p "  Bump to ${next_version}? [y/N] " reply
  [[ "$reply" =~ ^[Yy]$ ]] || die "Aborted."
fi

# Write the new version into package.json (no git tag — we tag manually later).
run "npm version '$next_version' --no-git-tag-version --allow-same-version >/dev/null"
ok "package.json set to $next_version"

# ----------------------------------------------------------------------------
# 3. Changelog  (smooth-release: changelog task)
#    Prepend a section for the new version in github-changelog-generator format,
#    listing closed issues since the last tag grouped by Breaking / Features / Fixes.
# ----------------------------------------------------------------------------
title "Update changelog"

today=$(date +%Y-%m-%d)

# Pull ignoredLabels from .smooth-releaserc if present, else defaults.
ignored_labels=$(node -e '
  const fs=require("fs");
  let rc={};
  try{ rc=JSON.parse(fs.readFileSync(".smooth-releaserc","utf8")); }catch(e){}
  const def=["DX","invalid","discussion"];
  const l=(rc.github&&rc.github.changelog&&rc.github.changelog.ignoredLabels)||def;
  process.stdout.write(l.join(","));
' 2>/dev/null || echo "DX,invalid,discussion")

# Fetch closed issues since the last tag (issues only, like dataType:"issues").
issues_json="[]"
if [[ -n "${since_date:-}" ]]; then
  issues_json=$(gh issue list --repo "$repo_slug" --state closed \
    --search "closed:>=${since_date}" --json number,title,labels,url,closedAt --limit 500 2>/dev/null || echo "[]")
fi

build_section() {
  # $1=jq label-filter for a type, prints "- title [#n](url)" lines
  jq -r --arg labels "$1" '
    map(select(.labels | map(.name) as $names | ($labels|split(",")) | any(. as $l | $names|index($l)))) |
    .[] | "- \(.title) [#\(.number)](\(.url))"' <<< "$issues_json"
}

# Filter out ignored labels first.
issues_json=$(jq --arg ig "$ignored_labels" '
  ($ig|split(",")) as $ignored |
  map(select(.labels | map(.name) as $n | ($ignored | any(. as $l | $n|index($l))) | not))' <<< "$issues_json")

breaking_lines=$(build_section "$(IFS=,; echo "${BREAKING_LABELS[*]}")")
bug_lines=$(build_section "$(IFS=,; echo "${BUG_LABELS[*]}")")
# Features = everything that isn't breaking or a bug.
feature_lines=$(jq -r --arg br "$(IFS=,; echo "${BREAKING_LABELS[*]}")" --arg bg "$(IFS=,; echo "${BUG_LABELS[*]}")" '
  ($br|split(",")) as $brk | ($bg|split(",")) as $bug |
  map(select(.labels | map(.name) as $n |
        ( ($brk|any(. as $l | $n|index($l))) or ($bug|any(. as $l | $n|index($l))) ) | not)) |
  .[] | "- \(.title) [#\(.number)](\(.url))"' <<< "$issues_json")

# Assemble the new section.
section="## [${new_tag}](https://github.com/${repo_slug}/tree/${new_tag}) (${today})
[Full Changelog](https://github.com/${repo_slug}/compare/${last_tag}...${new_tag})"
[[ -n "$breaking_lines" ]] && section="${section}

${BREAKING_TITLE}

${breaking_lines}"
[[ -n "$feature_lines" ]] && section="${section}

${FEATURE_TITLE}

${feature_lines}"
[[ -n "$bug_lines" ]] && section="${section}

${BUG_TITLE}

${bug_lines}"

# Insert the section right after the "#  Change Log" header.
if $DRY_RUN; then
  echo "  ${DIM}[dry-run] would prepend this CHANGELOG section:${RESET}"
  echo "$section" | sed 's/^/    /'
else
  if [[ -f "$CHANGELOG_FILE" ]] && head -1 "$CHANGELOG_FILE" | grep -q "Change Log"; then
    tmp=$(mktemp)
    { head -1 "$CHANGELOG_FILE"; echo; echo "$section"; echo; tail -n +2 "$CHANGELOG_FILE" | sed -e '/./,$!d'; } > "$tmp"
    mv "$tmp" "$CHANGELOG_FILE"
  else
    printf '#  Change Log\n\n%s\n' "$section" > "$CHANGELOG_FILE"
  fi
  ok "Prepended section for $new_tag to $CHANGELOG_FILE"
fi

# ----------------------------------------------------------------------------
# 4. Commit, tag & push  (smooth-release: commitAndPush)
# ----------------------------------------------------------------------------
title "Commit, tag & push"
run "git add '$CHANGELOG_FILE' package.json"
run "git commit -m '$next_version'"
run "git tag '$new_tag'"
run "git push"
run "git push --tags"
ok "Pushed $new_tag"

# ----------------------------------------------------------------------------
# 5. GitHub release  (smooth-release: gh-release)
#    Body mirrors smooth-release: links to the CHANGELOG anchor.
# ----------------------------------------------------------------------------
title "Create GitHub release"
anchor="${new_tag//./}-${today}"   # e.g. v0.49.11 -> v04911-2026-06-24
changelog_link="https://github.com/${repo_slug}/blob/${RELEASE_BRANCH}/CHANGELOG.md#${anchor}"
release_body="See [CHANGELOG.md](${changelog_link}) for details about this release."
run "gh release create '$new_tag' --repo '$repo_slug' --title '$new_tag' --notes '$release_body'"
ok "GitHub release $new_tag created"

# ----------------------------------------------------------------------------
# 6. Build & publish to npm  (smooth-release: npm-publish) — with 2FA/OTP retry
# ----------------------------------------------------------------------------
if $SKIP_PUBLISH; then
  warn "Skipping npm publish (--skip-publish)"
else
  title "Build & publish to npm"
  run "yarn build"

  publish_cmd="npm publish --registry '$NPM_REGISTRY'"
  if $DRY_RUN; then
    echo "  ${DIM}[dry-run] $publish_cmd${RESET}"
  else
    if [[ -n "$OTP" ]]; then
      echo "  ${DIM}\$ $publish_cmd --otp=***${RESET}"
      npm publish --registry "$NPM_REGISTRY" --otp="$OTP"
    else
      # Try without OTP; if npm asks for 2FA, prompt and retry (issue #120).
      if ! eval "$publish_cmd"; then
        warn "npm publish failed — this is usually a 2FA one-time password requirement."
        read -r -p "  Enter npm OTP (leave blank to abort): " otp_input
        [[ -n "$otp_input" ]] || die "Aborted: no OTP provided."
        npm publish --registry "$NPM_REGISTRY" --otp="$otp_input"
      fi
    fi
    ok "Published ${next_version} to npm"
  fi
fi

title "Done — released ${BOLD}${next_version}${RESET}${BOLD}${BLUE} 🎉${RESET}"
