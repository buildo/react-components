import * as React from "react";
import flattenDeep = require("lodash/flattenDeep");
import * as _linkify from "linkify-it";
import { LinkifyIt } from "linkify-it";

// TODO: replace "require" with "import"... for some reason they're workin only with "require"
const tlds = require("tlds");
const linkify: LinkifyIt = _linkify();
linkify.tlds(tlds);

export namespace FormattedText {
  export type Props = {
    /** The content of the paragraph */
    children: string;
    /** Pass `true` to linkify links */
    linkify?: boolean;
    id?: string;
    className?: string;
    style?: React.CSSProperties;
  };
}

export class FormattedText extends React.PureComponent<FormattedText.Props> {
  linkify(string: string): React.ReactNode {
    const matches = linkify.match(string);
    if (matches) {
      return matches.reduce((acc, match, i) => {
        const nextMatch = matches[i + 1];

        return [
          ...(acc || [string.slice(0, match.index)]),
          <a href={match.url} target="_blank">
            {match.raw}
          </a>,
          string.slice(match.lastIndex, nextMatch ? nextMatch.index : undefined)
        ];
      }, null as any);
    } else {
      return string;
    }
  }

  replaceLinksWithA(children: React.ReactNode[]): React.ReactNode[] {
    return flattenDeep(
      children.map(child => {
        if (typeof child === "string") {
          return this.linkify(child);
        } else {
          return child;
        }
      })
    );
  }

  replaceBreaklinesWithBR(children: string): React.ReactNode[] {
    const paragraphs = children.split(/\n/g);
    return flattenDeep(
      paragraphs.map((paragraph, i) => {
        const br = <br key={`br-${i}`} />;
        const p = (
          <React.Fragment key={`paragraph-${i}`}>{paragraph}</React.Fragment>
        );
        if (paragraph.length === 0) {
          return br;
        } else if (i < paragraphs.length - 1) {
          return [p, br];
        } else {
          return p;
        }
      })
    );
  }

  render() {
    const { children, linkify, ...props } = this.props;

    const formattedText = this.replaceBreaklinesWithBR(children);
    const newProps = {
      ...props,
      children: linkify ? this.replaceLinksWithA(formattedText) : formattedText
    };

    return <span {...newProps} />;
  }
}
