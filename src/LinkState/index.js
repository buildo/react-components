import get from 'lodash.get';
import set from 'lodash.set';

export const linkState = (_this, path) => {
  const value = get(_this.state, path);
  const requestChange = (newValue) => (
    _this.setState(set({ ..._this.state }, path, newValue))
  );
  return {
    value,
    requestChange
  };
};

export const getValueLink = (_this, _props) => {
  const props = _props || _this.props;
  return props.valueLink || {
    value: props.value,
    requestChange: props.onChange
  };
};

export const LinkedStateMixin = {
  linkState(path) {
    return linkState(this, path);
  }
};

export const ValueLinkMixin = {
  getValueLink(props) {
    return getValueLink(this, props);
  }
};
