# BrowserDetector

Top-level component which detects browser and renders children/placeholder based on a given whitelist of supported browsers.

## Props
|Name|Type|Default|Description|
|----|----|-------|-----------|
| **children** | <code>ReactChildren</code> |  | **required**. Children node rendered when using a supported browser |
| **placeholder** | <code>Function</code> |  | **required**. Called when using a non-supported browser. Expected to return a valid ReactNode. |
| **supportedBrowsers** | <code>Array<Browser></code> |  | *optional*. Whitelist of supported browsers. If `undefined` they're all supported |
| **userAgent** | <code>String</code> |  | *optional*. Custom user-agent |