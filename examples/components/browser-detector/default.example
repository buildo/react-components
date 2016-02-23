class Example extends React.Component {

  getPlaceholder = (detectedBrowser) => <span>{`"${detectedBrowser.name}" is not supported!`}</span>;

  render = () => (
    <BrowserDetector supportedBrowsers={['safari']} placeholder={this.getPlaceholder}>
      <div>My Beautiful APP</div>
    </BrowserDetector>
  );

}
