// import FormattedText from 'buildo-react-components/lib/FormattedText';

class Example extends React.Component {

  content = 'First line.\n\nI left an empty line.\n\n\n\nI left three empty lines.\nThis line comes after a single "\\n"\n\nhttps://google.com';

  render = () => (
    <FormattedText>{this.content}</FormattedText>
  );

}
