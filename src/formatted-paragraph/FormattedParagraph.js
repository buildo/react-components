import React from 'react';
import { props, t, skinnable } from '../utils';
import flattenDeep from 'lodash/flattenDeep';

export const Props = {
  content: t.String,
  paragraphSpacing: t.union([t.String, t.Number]),
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
export default class FormattedParagraph extends React.Component {

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
      children: this.replaceBreaklinesWithBR(content)
    };
  }

  template(locals) {
    return (
      <span {...locals} />
    );
  }

}
