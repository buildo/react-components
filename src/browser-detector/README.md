# BrowserDetector

## Top-level component which detects browser and renders children/placeholder based on a given whitelist of supported browsers.

|Name|Type|Default|Description|
|----|----|-------|-----------|
| children | ReactChildren | "" | children node rendered when using a supported browser |
| placeholder | Function | "" | called when using a non-supported browser. Expected to return a valid ReactNode. |
| supportedBrowsers | Array<Browser> | "" | whitelist of supported browsers. If `undefined` they're all supported |
| userAgent | String | "" | custom user-agent |