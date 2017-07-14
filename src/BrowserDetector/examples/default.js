class Example extends React.Component {

  getPlaceholder = (detectedBrowser) => <FlexView vAlignContent='center'>{`"${detectedBrowser.name}" is not supported!`}</FlexView>;

  render = () => (
    <div className='browser-detector'>
      <BrowserDetector supportedBrowsers={['safari']} placeholder={this.getPlaceholder}>
        <FlexView vAlignContent='center'>My Beautiful APP</FlexView>
      </BrowserDetector>
    </div>
  );

}
