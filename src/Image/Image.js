import React from 'react';
import { props, t } from '../utils';
import getUrl from './getUrl';

@props({
  src: t.String,
  width: t.maybe(t.Number),
  height: t.maybe(t.Number),
  quality: t.maybe(t.union([t.Number, t.enums.of(['auto'])])),
  format: t.maybe(t.enums.of(['jpeg', 'png', 'wdp', 'gif', 'auto']))
})
export default class Image extends React.Component {

  render() {
    const { src, width, height, quality, ...props } = this.props;
    const url = getUrl(src, { width, height, quality });

    return (
      <img {...props} src={url} />
    );
  }

}
