const cloudinaryId = "buildo";
const cloudinaryBaseUrl = `https://res.cloudinary.com/${cloudinaryId}/image/fetch/`;

function isRetinaDisplay() {
  if (window.matchMedia) {
    const mq = window.matchMedia(
      "only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen  and (min-device-pixel-ratio: 1.3), only screen and (min-resolution: 1.3dppx)"
    );
    return (mq && mq.matches) || window.devicePixelRatio > 1;
  }
}

export interface CloudinaryParams {
  width?: number;
  height?: number;
  quality?: number | "auto";
  format?: "jpeg" | "png" | "wdp" | "gif" | "auto";
}

function getUrl(
  src: string,
  {
    width: _width,
    height: _height,
    quality: _quality,
    format: _format
  }: CloudinaryParams = {}
): string {
  const isAbsolute = src.indexOf("http") >= 0;
  const isBase64 = src.slice(0, 5) === "data:";

  if (isBase64) {
    return src;
  }

  const origin = !isAbsolute ? window.location.origin : "";
  const width = _width ? `w_${isRetinaDisplay ? _width * 2 : _width}/` : "";
  const height = _height ? `h_${isRetinaDisplay ? _height * 2 : _height}/` : "";
  const quality = _quality ? `q_${_quality}/` : "";
  const format = _format ? `f_${_format}/` : "";

  const cloudinaryUrl = `${cloudinaryBaseUrl}${format}${width}${height}${quality}${origin}${src}`;

  return process.env.NODE_ENV !== "development" ? cloudinaryUrl : src;
}

export const getBackgroundUrl = (
  src: string,
  cloudinaryParams: CloudinaryParams
) => `url(${getUrl(src, cloudinaryParams)})`;

export default getUrl;
