class Example extends React.Component {

  constructor() {
    super();
    this.state = {
      value: {
        id: 5,
        content: null
      }
    }
  }

  render = () => (
    <div>
      <input valueLink={linkState(this, 'value.content')} />
      <p>{`state: ${JSON.stringify(this.state, null, 2)}`}</p>
    </div>
  );

}
