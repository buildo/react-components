// import { StatefulButton } from 'buildo-react-components/lib/Button';

class Example extends React.Component {

  onClick = () => new Promise((resolve, reject) => {
    const headsOrTails = () => Math.random() > .5;
    const resolveOrReject = () => {
      const _headsOrTails = headsOrTails();
      _headsOrTails ? resolve() : reject();
    };
    setTimeout(resolveOrReject, 500);
  });

  icons = {
    success: 'check',
    error: 'error'
  };

  render = () => (
    <StatefulButton
      baseState='ready'
      label='Button label'
      icon={this.icons}
      onClick={this.onClick}
      style={{ width: 150 }}
    />
  );
}
