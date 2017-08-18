type LinkState = (_this: any, path: string) => { value: any, requestChange: (newValue: any) => void }
type GetValueLink = (_this: any, _props: any) => { value: any, requestChange: (newValue: any) => void }

export const linkState: LinkState
export const getValueLink: GetValueLink
export const LinkedStateMixin: { linkState: LinkState }
export const ValueLinkMixin: { getValueLink: GetValueLink }
