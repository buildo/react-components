class Example extends React.Component {

  content = 'First line.\n\nI left an empty line.\n\n\n\nI left three empty lines.\nThis line comes after a single "\\n"\nhttps://ciaone.com';

  render = () => (
    <FormattedParagraph content={this.content} paragraphSpacing={20} />
  );

}
