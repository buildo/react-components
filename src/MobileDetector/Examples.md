### Examples

```js
class CheckContext extends React.Component {
  render() {
    console.log(JSON.stringify(this.context, null, 2));
    return <div>{JSON.stringify(this.context, null, 2)}</div>;
  }
}

CheckContext.contextTypes = {
  isDesktop: PropTypes.bool.isRequired,
  isMobile: PropTypes.bool.isRequired,
  isPhone: PropTypes.bool.isRequired,
  isTablet: PropTypes.bool.isRequired
};

<div>
  <MobileDetector>
    {() => <CheckContext />}
  </MobileDetector>
</div>
```
