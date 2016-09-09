import React from 'react';
import ReactDOM from 'react-dom';
import cx from 'classnames';
import { pure, props, t, skinnable } from '../utils';
import partial from 'lodash/partial';
import FlexView from 'react-flexview';
import Divider from '../Divider/Divider';

export const optionType = t.struct({
  type: t.enums.of(['title', 'item', 'divider']),
  title: t.maybe(t.ReactChildren),
  metadata: t.Any,
  selected: t.maybe(t.Bool),
  disabled: t.maybe(t.Bool),
  onClick: t.maybe(t.Func)
}, 'optionType');

export const Props = {
  style: t.maybe(t.Obj),
  maxHeight: t.maybe(t.Num),
  options: t.maybe(t.list(optionType)),
  onClick: t.maybe(t.Func)
};

@pure
@skinnable()
@props(Props)
export default class Menu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      height: null
    };
  }

  static defaultProps = {
    style: {},
    onClick: () => {}
  };

  componentDidMount() {
    const { top: scrollTop, height } = ReactDOM.findDOMNode(this).getBoundingClientRect();
    const { height: wHeight } = document.documentElement.getBoundingClientRect();
    if (wHeight - (scrollTop + height) < 20) {
      this.setState({ // eslint-disable-line react/no-did-mount-set-state
        height: wHeight - scrollTop - 20
      });
    }
  }

  onOptionClick = option => {
    this.props.onClick();
    if (!option.disabled) {
      option.onClick(option);
    }
  };

  getLocals() {
    const { options, style, maxHeight: maxHeightProp } = this.props;
    const maxHeight = this.state.height || maxHeightProp;
    const { onOptionClick } = this;
    return {
      options,
      style,
      maxHeight,
      onOptionClick
    };
  }

  menuItemTemplate = (option, onOptionClick) => {
    return (
      <FlexView className={cx('menu-item', { disabled: option.disabled, selected: option.selected })} onClick={partial(onOptionClick, option)} vAlignContent='center'>
        <FlexView grow shrink className='menu-item-title'>
          {option.title}
        </FlexView>
        <FlexView grow shrink={false} className='menu-item-metadata' hAlignContent='right'>
          {option.metadata}
        </FlexView>
      </FlexView>
    );
  };

  templateRenderedOptions = ({ options, onOptionClick }) => {
    return options.map((option, i) => (
      <div className='menu-row' key={i}>
        {option.type === 'title' && <div className='menu-title'>{option.title}</div>}
        {option.type === 'item' && this.menuItemTemplate(option, onOptionClick)}
        {option.type === 'divider' && <Divider />}
      </div>
    ));
  };

  template(locals) {
    return (
      <div className='menu' style={{ ...locals.style, maxHeight: locals.maxHeight }}>
        {this.templateRenderedOptions(locals)}
      </div>
    );
  }

}
