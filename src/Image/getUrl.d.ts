type CloudinaryParams = {
  width?: number,
  height?: number,
  quality?: number | 'auto',
  format?: 'jpeg' | 'png' | 'wdp' | 'gif' | 'auto'
}

declare function getUrl(src: string, params?: CloudinaryParams): string;
export default getUrl;
export function getBackgroundUrl(src: string, params?: CloudinaryParams): string
