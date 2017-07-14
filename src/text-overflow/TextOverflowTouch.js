import React from 'react';
import TooltipTouch, { Props } from '../Tooltip/TooltipTouch';
import { props } from '../utils';

@props(Props)
export default class TextOverflowTouch extends React.PureComponent {

  render() {
    const { label: _label, popover, ...props } = this.props;
    const label = typeof _label === 'undefined' ? '' : String(_label);

    return (
      <TooltipTouch {...props} className='text-overflow-touch' popover={{ ...popover, content: label }}>
        {label}
      </TooltipTouch>
    );
  }
}

export { Props };
