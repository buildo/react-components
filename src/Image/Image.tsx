import * as React from 'react';
import getUrl from './getUrl';

export namespace Image {
  export type Props = {
    /** path to the image */
    src: string;
    /** used to resize the image to this width before downloading it */
    width?: number;
    /** used to resize the image to this height before downloading it */
    height?: number;
    /** can be a number from 1 to 100 or "auto". Use "auto" to let cloudinary decide the quality for you */
    quality?: number | 'auto';
    /** which format the image should be. Use "auto" to let cloudinary decide the format for you */
    format?: 'jpeg' | 'png' | 'wdp' | 'gif' | 'auto';
  } & React.HTMLAttributes<HTMLImageElement>;
}

/** A replacement for `<img>` to serve optimized images through a CDN in production */
export class Image extends React.Component<Image.Props> {
  render() {
    const { src, width, height, quality, ...props } = this.props;
    const url = getUrl(src, { width, height, quality });

    return <img {...props} width={width} height={height} src={url} />;
  }
}
