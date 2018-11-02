declare module "gemini-scrollbar" {
  type GeminiScrollbarOptions = {
    element?: Element;
    autoshow?: boolean;
    createElements?: boolean;
    forceGemini?: boolean;
    onResize?: () => void;
    minThumbSize?: number;
  };

  class GeminiScrollbar {
    constructor(options: GeminiScrollbarOptions);
    create: () => GeminiScrollbar;
    update: () => GeminiScrollbar;
    destroy: () => GeminiScrollbar | null;
    getViewElement(): Element;
  }

  export = GeminiScrollbar;
}
