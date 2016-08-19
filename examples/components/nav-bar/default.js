class Example extends React.Component {

  left() {
    return <div>LEFT</div>;
  }

  center() {
    return <div>CENTER</div>;
  }

  right() {
    return <div>RIGHT</div>;
  }

  render() {
    const props = {
      content: {
        left: this.left(),
        center: this.center(),
        right: this.right(),
        maxWidth: '80%'
      },
      background: 'brown',
      height: 80
    };

    return <NavBar {...props} />;
  }
}
