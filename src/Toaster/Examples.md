### Examples

```js
const toastStyles = [
  {
    message: 'Saturday',
    backgroundColor: '#f0f3f8',
    contentColor: '#9098a7',
    icon: 'message'
  },
  {
    message: 'a Sunny Day',
    backgroundColor: '#e7f6e9',
    contentColor: '#39b54a',
    icon: 'check2'
  },
  {
    message: 'a Cloudy Day',
    backgroundColor: '#fff9e4',
    contentColor: '#fecf39',
    icon: 'important'
  },
  {
    message: 'a Rainy Day',
    backgroundColor: '#feeced',
    contentColor: '#fb242c',
    icon: 'error'
  }
];

const getToastStyle = i => {
  const toastStyle = toastStyles[i];
  return {
    backgroundColor: toastStyle.backgroundColor,
    color: toastStyle.contentColor,
    border: `1px solid ${toastStyle.contentColor}`,
    height: 50,
    width: 200,
    padding: 20,
    borderRadius: 4,
    marginTop: 10,
    marginRight: 20
  };
};

const transitionStyles = {
  enter: {
    opacity: '0.2',
    transform: 'translateX(100%)',
    WebkitTransition: 'opacity .8s ease-out, -webkit-transform .8s ease-out',
    transition: 'opacity .8s ease-out, transform .8s ease-out'
  },
  enterActive: {
    opacity: '1',
    transform: 'translateX(0)'
  },
  leave: {
    opacity: '1',
    transform: 'translateX(0)',
    WebkitTransition: 'opacity .8s ease-out, -webkit-transform .8s ease-out',
    transition: 'opacity .8s ease-out, transform .8s ease-out'
  },
  leaveActive: {
    opacity: '0.01',
    transform: 'translateX(100%)'
  },
  default: {
    WebkitTransition: '-webkit-transform 0.3s ease-in-out',
    transition: 'transform 0.3s ease-in-out'
  }
};

const generatePeriodicToasts = (consumer, onTimeout) => {
  const key = Math.random() + '';
  const toastStyle = Math.round(key * (toastStyles.length - 1));
  const toast = {
    key,
    el: (
      <TimerToast onTimeout={onTimeout} duration={4000} key={key}>
        <FlexView  vAlignContent='center' style={getToastStyle(toastStyle)}>
          <Icon icon={toastStyles[toastStyle].icon} style={{ marginRight: 10, color: toastStyles[toastStyle].contentColor }} />
          {`Today is ${toastStyles[toastStyle].message}`}
        </FlexView>
      </TimerToast>
    )
  };
  consumer(toast);
  setTimeout(() => generatePeriodicToasts(consumer, onTimeout), Math.random() * 2000 + 1000);
};

class Component extends React.Component {

  constructor() {
    this.state = { toasts: [] };
    this.onTimeout = this.onTimeout.bind(this);
  }

  componentDidMount() {
    generatePeriodicToasts(toast => {
      this.setState({
        toasts: [toast].concat(this.state.toasts)
      });
    }, this.onTimeout);
  }

  onTimeout(key) {
    this.setState({
      toasts: reject(this.state.toasts, { key })
    });
  }

  render() {

    const toasts = this.state.toasts.map(t => t.el);

    return (
      <div>
        <div style={{ width: '100%', height: 350, position: 'relative' }}>
          <Toaster
            transitionStyles={transitionStyles}
            transitionEnterTimeout={800}
            transitionLeaveTimeout={800}
          >
            {toasts}
          </Toaster>
        </div>
      </div>
    );
  }

}

<Component />
```
