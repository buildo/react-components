export function warn(content: any | (() => void)) {
  if (process.env.NODE_ENV !== 'production') {
    const message = (typeof content === 'function') ? content() : content;
    if (message) {
      console.warn(...([] as string[]).concat(message)); // eslint-disable-line no-console
    }
  }
}
