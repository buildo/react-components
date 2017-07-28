// import { linkState } from 'buildo-react-components/lib/LinkState';

class Example extends React.Component {

  render = () => (
    <div>
      <input valueLink={linkState(this, 'value')} />
      <p>{`state: ${JSON.stringify(this.state, null, 2)}`}</p>
    </div>
  );

}
