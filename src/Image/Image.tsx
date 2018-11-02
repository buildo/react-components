import * as React from "react";
import { props, t } from "../utils";
import getUrl from "./getUrl";

export namespace Image {
  export type Props = {
    /** path to the image */
    src: string;
    /** used to resize the image to this width before downloading it */
    width?: number;
    /** used to resize the image to this height before downloading it */
    height?: number;
    /** can be a number from 1 to 100 or "auto". Use "auto" to let cloudinary decide the quality for you */
    quality?: number | "auto";
    /** which format the image should be. Use "auto" to let cloudinary decide the format for you */
    format?: "jpeg" | "png" | "wdp" | "gif" | "auto";
  } & React.HTMLAttributes<HTMLImageElement>;
}

export const Props = {
  src: t.String,
  width: t.maybe(t.Number),
  height: t.maybe(t.Number),
  quality: t.maybe(t.union([t.Number, t.enums.of(["auto"])])),
  format: t.maybe(t.enums.of(["jpeg", "png", "wdp", "gif", "auto"]))
};

/** A replacement for `<img>` to serve optimized images through a CDN in production */
@props(Props, { strict: false })
export class Image extends React.Component<Image.Props> {
  render() {
    const { src, width, height, quality, ...props } = this.props;
    const url = getUrl(src, { width, height, quality });

    return <img {...props} width={width} height={height} src={url} />;
  }
}
