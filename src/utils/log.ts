declare const process: { env: { NODE_ENV?: string } }

export function warn(content: string | (() => void)) {
  if (process.env.NODE_ENV !== 'production') {
    const message = (typeof content === 'function') ? content() : content;
    if (message) {
      console.warn(...([] as string[]).concat(message)); // eslint-disable-line no-console
    }
  }
}
