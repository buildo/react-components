/**
 * Props mixin that allows a component to accept arbitrary `data-*` attributes
 * and forward them to its root element. Typed as a generic string-indexed
 * record because prettier 1.x can't parse template-literal keys; the runtime
 * filter below ensures only `data-*` keys are actually forwarded.
 */
export type DataAttributes = {
  [key: string]: unknown;
};

export function pickDataAttributes<P extends object>(props: P): DataAttributes {
  const out: DataAttributes = {};
  for (const k of Object.keys(props)) {
    if (k.indexOf('data-') === 0) {
      out[k] = (props as { [key: string]: unknown })[k];
    }
  }
  return out;
}
