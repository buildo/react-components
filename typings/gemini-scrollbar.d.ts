declare module 'gemini-scrollbar' {

  export type GeminiScrollbarOptions = {
    element?: Element,
    autoshow?: boolean,
    createElements?: boolean,
    forceGemini?: boolean,
    onResize?: () => void,
    minThumbSize?: number
  }

  export default class GeminiScrollbar {
    constructor(options: GeminiScrollbarOptions);
    create: () => GeminiScrollbar;
    update: () => GeminiScrollbar;
    destroy: () => GeminiScrollbar | null;
    getViewElement(): Element
  }
}
