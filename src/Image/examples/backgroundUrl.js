// import getUrl, { getBackgroundUrl } from 'buildo-react-components/lib/Image/getUrl';

class Example extends React.Component {

  render() {
    const height = 200;
    const backgroundUrl = getBackgroundUrl(
      'https://cdn.pixabay.com/photo/2015/03/23/21/11/colored-pencils-686679_1280.jpg',
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
