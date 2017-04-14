import React from 'react';
import uniq from 'lodash/uniq';
import { props, t, skinnable } from '../utils';

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

  Paragraph = ({ children, marginTop }) => {
    const style = {
      marginTop,
      marginLeft: 0,
      marginBottom: 0,
      marginRight: 0
    };

    const _children = children.split('\n').map((p, i) => i > 0 ? [<br />, p] : p); // handle single breaklines ("\n") inside paragraph

    return (
      <p style={style}>
        {_children}
      </p>
    );
  }

  getLocals({ content, paragraphSpacing, ...props }) {
    const seriesOfNewParagraphs = uniq(content.match(/\n\n+/g));
    const paragraphs = content.split(/\n\n+/);

    const children = paragraphs.map((paragraph, i) => (
      <this.Paragraph marginTop={i !== 0 ? paragraphSpacing * (seriesOfNewParagraphs[i - 1].length - 1) : 0}>
        {paragraph}
      </this.Paragraph>
    ));

    return {
      ...props,
      children
    };
  }

  template(locals) {
    return (
      <div {...locals} />
    );
  }

}
