import React from 'react';
import { props, t, skinnable } from '../utils';
import flattenDeep from 'lodash/flattenDeep';
import tlds from 'tlds';

const linkify = require('linkify-it')().tlds(tlds);

export const Props = {
  content: t.String,
  id: t.maybe(t.String),
  className: t.maybe(t.String),
  style: t.maybe(t.Object)
};

/** A component that correctly formats multiple "\n"
 * @param content - The content of the paragraph
 * @param paragraphSpacing - The space occupied by an empty line
 */
@skinnable()
@props(Props)
export default class FormattedText extends React.Component {

  linkify(string) {
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

  replaceLinksWithA(children) {
    return flattenDeep([].concat(children).map((child) => {
      if (t.String.is(child)) {
        return this.linkify(child);
      } else {
        return child;
      }
    }));
  }

  replaceBreaklinesWithBR(children) {
    return flattenDeep([].concat(children).map((child) => {
      if (t.String.is(child)) {
        const paragraphs = child.split(/\n/g);

        return paragraphs.map((paragraph, i) => {
          if (paragraph.length === 0) {
            return <br />;
          } else if (i < paragraphs.length - 1) {
            return [paragraph, <br />];
          } else {
            return paragraph;
          }
        });
      } else {
        return child;
      }
    }));
  }

  getLocals({ content, ...props }) {
    return {
      ...props,
      children: this.replaceLinksWithA(this.replaceBreaklinesWithBR(content))
    };
  }

  template(locals) {
    return (
      <span {...locals} />
    );
  }

}
