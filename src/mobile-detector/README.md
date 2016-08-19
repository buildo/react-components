# MobileDetector

## Top-level component which detects device type and passes this info to children as context

|Name|Type|Default|Description|
|----|----|-------|-----------|
| children | Function | "" | children must be passed as function so to propagte context correctly. Environment info is also passed as first argument to the callback |
| forceDesktop | Boolean | "" | ignores real device type and considers it as desktop |
| userAgent | String | "" | custom user-agent |