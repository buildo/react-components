class Example extends React.Component {

  content = 'First line.\n\nI left an empty line.\n\n\n\nI left three empty lines.\nThis line comes after a single "\\n"\n\nhttps://google.com';

  render = () => (
    <FormattedText content={this.content} />
  );

}
