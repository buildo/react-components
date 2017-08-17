const cloudinaryId = 'buildo';
const cloudinaryBaseUrl = `https://res.cloudinary.com/${cloudinaryId}/image/fetch/`;
const defaultParams = {
  quality: 'auto',
  format: 'auto'
};

function isRetinaDisplay() {
  if (window.matchMedia) {
    const mq = window.matchMedia('only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen  and (min-device-pixel-ratio: 1.3), only screen and (min-resolution: 1.3dppx)');
    return (mq && mq.matches || (window.devicePixelRatio > 1));
  }
}

function getParamsWithDefaults(params) {
  return {
    ...defaultParams,
    ...params
  };
}

function getUrl(src, params) {
  const { width: _width, height: _height, quality: _quality, format: _format } = getParamsWithDefaults(params);
  const isAbsolute = src.indexOf('http') >= 0;

  const origin = !isAbsolute ? window.location.origin : '';
  const width = _width ? `w_${isRetinaDisplay ? _width * 2 : _width}/` : '';
  const height = _height ? `w_${isRetinaDisplay ? _height * 2 : _height}/` : '';
  const quality = _quality ? `q_${_quality}/` : '';
  const format = _format ? `f_${_format}/` : '';

  const cloudinaryUrl = `${cloudinaryBaseUrl}${format}${width}${height}${quality}${origin}${src}`;

  return process.env.NODE_ENV !== 'development' ? cloudinaryUrl : src;
}

export const getBackgroundUrl = (...args) => `url(${getUrl(...args)})`;

export default getUrl;
