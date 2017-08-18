// import getUrl, { getBackgroundUrl } from 'buildo-react-components/lib/Image/getUrl';

class Example extends React.Component {

  render() {
    const height = 200;
    const backgroundUrl = getBackgroundUrl(
      'https://s29.postimg.org/v0nnm9gx3/colored-pencils-686679_1280.jpg',
      { height }
    );

    return (
      <div
        style={{
          height,
          backgroundImage: backgroundUrl,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          width: '100%'
        }}
      />
    );
  }

}
