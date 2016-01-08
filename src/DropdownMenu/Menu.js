import React from 'react';
import { pure, props, t, skinnable } from '../utils';
import partial from 'lodash/function/partial';
import Divider from '../Divider/Divider';

export const optionType = t.struct({
  type: t.enums.of(['title', 'item', 'divider']),
  title: t.maybe(t.ReactNode),
  metadata: t.Any,
  onClick: t.maybe(t.Func)
}, 'optionType');

@pure
@skinnable()
@props({
  style: t.maybe(t.Obj),
  maxHeight: t.maybe(t.Num),
  options: t.maybe(t.list(optionType)),
  onClick: t.maybe(t.Func)
})
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
  }

  componentDidMount() {
    const { top: scrollTop, height } = React.findDOMNode(this).getBoundingClientRect();
    const { height: wHeight } = document.documentElement.getBoundingClientRect();
    if (wHeight - (scrollTop + height) < 20) {
      this.setState({ // eslint-disable-line react/no-did-mount-set-state
        height: wHeight - scrollTop - 20
      });
    }
  }

  onOptionClick = option => {
    this.props.onClick();
    option.onClick(option);
  }

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
      <div className='menu-item' onClick={partial(onOptionClick, option)}>
        <span className='menu-item-title'>
          {option.title}
        </span>
        <span className='menu-item-metadata'>
          {option.metadata}
        </span>
      </div>
    );
  }

  templateRenderedOptions = ({ options, onOptionClick }) => {
    return options.map((option, i) => (
      <div className='menu-row' key={i}>
        {option.type === 'title' && <div className='menu-title'>{option.title}</div>}
        {option.type === 'item' && this.menuItemTemplate(option, onOptionClick)}
        {option.type === 'divider' && <Divider />}
      </div>
    ));
  }

  template(locals) {
    return (
      <div className='menu' style={{ ...locals.style, maxHeight: locals.maxHeight }}>
        {this.templateRenderedOptions(locals)}
      </div>
    );
  }

}
