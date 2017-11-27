### Examples

#### Image component: a drop-in replacement for <img>
```js
<Image
  src='https://s29.postimg.org/v0nnm9gx3/colored-pencils-686679_1280.jpg'
  height={200}
  quality={90}
/>
```

#### `getUrl` and `getBackgroundUrl` utils
```js
const height = 200;
const backgroundUrl = getBackgroundUrl(
  'https://s29.postimg.org/v0nnm9gx3/colored-pencils-686679_1280.jpg',
  { height }
);

const style = {
  height,
  backgroundImage: backgroundUrl,
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  width: '100%'
};

<div style={style} />
```
