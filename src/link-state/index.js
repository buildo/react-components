import get from 'lodash/object/get';
import set from 'lodash/object/set';

const linkState = (_this, path) => {
  const value = get(_this.state, path);
  const requestChange = (value) => _this.setState(set({}, path, value));
  return {
    value,
    requestChange
  };
};

const getValueLink = (_this, _props) => {
  const props = _props || _this.props;
  return props.valueLink || {
    value: props.value,
    requestChange: props.onChange
  };
};

const LinkedStateMixin = {
  linkState(path) {
    return linkState(this, path);
  }
};

const ValueLinkMixin = {
  getValueLink(props) {
    return getValueLink(this, props);
  }
};

export default {
  linkState,
  getValueLink,
  LinkedStateMixin,
  ValueLinkMixin
};