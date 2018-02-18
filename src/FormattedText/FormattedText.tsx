import * as React from 'react';
import { props, t } from '../utils';
import flattenDeep = require('lodash/flattenDeep');
import tlds from 'tlds';
import { LinkifyIt } from 'linkify-it';

const linkify: LinkifyIt = require('linkify-it')().tlds(tlds);

export namespace FormattedText {
  export type Props = {
    /** The content of the paragraph */
    children: string,
    /** Pass `true` to linkify links */
    linkify?: boolean,
    id?: string,
    className?: string,
    style?: React.CSSProperties
  }
}

export const Props = {
  children: t.String,
  linkify: t.Boolean,
  id: t.maybe(t.String),
  className: t.maybe(t.String),
  style: t.maybe(t.Object)
};

@props(Props)
export class FormattedText extends React.PureComponent<FormattedText.Props> {

  linkify(string: string): React.ReactNode {
    const matches = linkify.match(string);
    if (matches) {
      return matches.reduce((acc, match, i) => {
        const nextMatch = matches[i + 1];

        return [
          ...(acc || [string.slice(0, match.index)]),
          <a href={match.url} target='_blank'>{match.raw}</a>,
          string.slice(match.lastIndex, nextMatch ? nextMatch.index : undefined)
        ];
      }, null);
    } else {
      return string;
    }
  }

  replaceLinksWithA(children: React.ReactNode[]): React.ReactNode[] {
    return flattenDeep(children.map((child) => {
      if (t.String.is(child)) {
        return this.linkify(child);
      } else {
        return child;
      }
    }));
  }

  replaceBreaklinesWithBR(children: string): React.ReactNode[]  {
    const paragraphs = children.split(/\n/g);
    return flattenDeep(paragraphs.map((paragraph, i) => {
      if (paragraph.length === 0) {
        return <br />;
      } else if (i < paragraphs.length - 1) {
        return [paragraph, <br />];
      } else {
        return paragraph;
      }
    }));
  }

  render() {
    const { children, linkify, ...props } = this.props;

    const formattedText = this.replaceBreaklinesWithBR(children);
    const newProps = {
      ...props,
      children: linkify ? this.replaceLinksWithA(formattedText) : formattedText
    }

    return (
      <span {...newProps} />
    );
  }

}
