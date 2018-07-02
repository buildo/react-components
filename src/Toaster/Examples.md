### Examples

```js
const toastStyles = [
  {
    message: 'Saturday',
    backgroundColor: '#f0f3f8',
    contentColor: '#9098a7',
    icon: (
      <svg version='1.1' xmlns='http://www.w3.org/2000/svg' height='14' viewBox='0 0 29 32'>
        <path fill='#9098a7' d='M25.62 26.133h-15.959c-0.025 0.001-0.054 0.001-0.083 0.001-1.971 0-3.569-1.598-3.569-3.569 0-0.029 0-0.058 0.001-0.087l-0-12.755c-0.001-0.025-0.001-0.054-0.001-0.083 0-1.971 1.598-3.569 3.569-3.569 0.029 0 0.058 0 0.087 0.001l15.955-0c0.025-0.001 0.054-0.001 0.083-0.001 1.971 0 3.569 1.598 3.569 3.569 0 0.029-0 0.058-0.001 0.087l0 12.755c0.001 0.025 0.001 0.054 0.001 0.083 0 1.971-1.598 3.569-3.569 3.569-0.029 0-0.058-0-0.087-0.001zM10.113 22.031h15.036v-11.856h-15.036v11.856zM9.662 8.123v0z'></path>
        <path fill='#9098a7' d='M23.344 32c-0.591-0.002-1.123-0.254-1.496-0.655l-4.822-5.171c-0.34-0.365-0.548-0.856-0.548-1.396 0-1.109 0.881-2.013 1.981-2.050l4.988-0.164c0.039-0.003 0.084-0.004 0.13-0.004 0.547 0 1.040 0.23 1.387 0.598 0.369 0.372 0.597 0.883 0.597 1.447 0 0.025-0 0.051-0.001 0.076l-0.164 5.33c-0.034 1.106-0.939 1.99-2.050 1.99-0 0-0.001 0-0.001 0z'></path>
        <path fill='#9098a7' d='M2.051 19.692c-1.133 0-2.051-0.918-2.051-2.051v-15.59c0-1.133 0.918-2.051 2.051-2.051h18.667c1.133 0 2.051 0.918 2.051 2.051s-0.918 2.051-2.051 2.051h-16.615v13.538c0 1.133-0.918 2.051-2.051 2.051z'></path>
      </svg>
    )

  },
  {
    message: 'a Sunny Day',
    backgroundColor: '#e7f6e9',
    contentColor: '#39b54a',
    icon: (
      <svg version='1.1' xmlns='http://www.w3.org/2000/svg' height='14' viewBox='0 0 28 28'>
        <path fill='#39b54a' d='M26.109 8.844q0 0.625-0.438 1.062l-13.438 13.438q-0.438 0.438-1.062 0.438t-1.062-0.438l-7.781-7.781q-0.438-0.438-0.438-1.062t0.438-1.062l2.125-2.125q0.438-0.438 1.062-0.438t1.062 0.438l4.594 4.609 10.25-10.266q0.438-0.438 1.062-0.438t1.062 0.438l2.125 2.125q0.438 0.437 0.438 1.062z'></path>
      </svg>
    )
  },
  {
    message: 'a Cloudy Day',
    backgroundColor: '#fff9e4',
    contentColor: '#fecf39',
    icon: (
      <svg version='1.1' xmlns='http://www.w3.org/2000/svg' height='14' viewBox='0 0 32 32'>
        <path fill='#fecf39' d='M14 20h4v4h-4v-4z'></path>
        <path fill='#fecf39' d='M14 8h4v10h-4v-10z'></path>
        <path fill='#fecf39' d='M16 0c-8.837 0-16 7.163-16 16s7.163 16 16 16c8.837 0 16-7.163 16-16s-7.163-16-16-16zM16 28c-6.627 0-12-5.373-12-12s5.373-12 12-12c6.627 0 12 5.373 12 12s-5.373 12-12 12z'></path>
      </svg>
    )
  },
  {
    message: 'a Rainy Day',
    backgroundColor: '#feeced',
    contentColor: '#fb242c',
    icon: (
      <svg version="1.1" xmlns='http://www.w3.org/2000/svg' height='14' viewBox='0 0 24 28'>
        <path fill='#fb242c' d='M17.953 17.531q0-0.406-0.297-0.703l-2.828-2.828 2.828-2.828q0.297-0.297 0.297-0.703 0-0.422-0.297-0.719l-1.406-1.406q-0.297-0.297-0.719-0.297-0.406 0-0.703 0.297l-2.828 2.828-2.828-2.828q-0.297-0.297-0.703-0.297-0.422 0-0.719 0.297l-1.406 1.406q-0.297 0.297-0.297 0.719 0 0.406 0.297 0.703l2.828 2.828-2.828 2.828q-0.297 0.297-0.297 0.703 0 0.422 0.297 0.719l1.406 1.406q0.297 0.297 0.719 0.297 0.406 0 0.703-0.297l2.828-2.828 2.828 2.828q0.297 0.297 0.703 0.297 0.422 0 0.719-0.297l1.406-1.406q0.297-0.297 0.297-0.719zM24 14q0 3.266-1.609 6.023t-4.367 4.367-6.023 1.609-6.023-1.609-4.367-4.367-1.609-6.023 1.609-6.023 4.367-4.367 6.023-1.609 6.023 1.609 4.367 4.367 1.609 6.023z'></path>
      </svg>
    )
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
          <FlexView style={{ marginRight: 10 }}>{toastStyles[toastStyle].icon}</FlexView>
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
