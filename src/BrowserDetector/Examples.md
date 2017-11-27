### Examples

```js
getPlaceholder = (detectedBrowser) => (
  <FlexView vAlignContent='center'>
    {`"${detectedBrowser.name}" is not supported!`}
  </FlexView>
);

<div className='browser-detector'>
  <BrowserDetector supportedBrowsers={['safari']} placeholder={getPlaceholder}>
    <FlexView vAlignContent='center'>My Beautiful APP</FlexView>
  </BrowserDetector>
</div>
```
