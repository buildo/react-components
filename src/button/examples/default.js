class Example extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      label: 'click me',
      baseState: 'ready',
      size: 'medium',
      fluid: false,
      type: 'default',
      onClick: () => new Promise((resolve, reject) => {
        const headsOrTails = () => Math.random() > .5;
        const resolveOrReject = () => {
          const _headsOrTails = headsOrTails();
          log(_headsOrTails ? 'resolve' : 'reject');
          _headsOrTails ? resolve() : reject();
        }
        setTimeout(resolveOrReject, 200);
      })
    };
  }

  dropdownTemplate = (prop, options) => (
    <div style={{ marginBottom: 4 }}>
      <Dropdown
        placeholder={`select ${prop}`}
        options={options.map(x => ({ value: String(x), label: JSON.stringify(x), originalValue: x }))}
        value={String(this.state[prop])}
        clearable
        onChange={value => this.setState({ [prop]: find(options, v => String(v) === value) })}
      />
    </div>
  );

  render() {

    return (
      <div>
        <div style={{ marginBottom: 20 }}>
          {this.dropdownTemplate('buttonState', ['ready', 'processing', 'error', 'success', 'not-allowed'])}
          {this.dropdownTemplate('size', ['small', 'medium', 'tiny'])}
          {this.dropdownTemplate('type', ['default', 'positive', 'negative', 'flat', 'primary'])}
          {this.dropdownTemplate('label', ['click me', 'very very very very very very very long label', ''])}
          {this.dropdownTemplate('icon', ['gift', 'asterisk', 'minus', 'compress', 'eye', 'fire', 'warning', 'mail', 'ban', 'arrow'])}
          {this.dropdownTemplate('circular', [true, false])}
          {this.dropdownTemplate('fluid', [true, false])}
          {this.dropdownTemplate('baseState', ['ready'])}
          {this.dropdownTemplate('style', [{ color: 'rebeccaPurple' }])}
        </div>
        <StatefulButton {...this.state} icon={{ error: 'error', success: 'check' }} />
      </div>
    );
  }
}
