import * as React from 'react';
import TooltipTouch, { Props } from '../Tooltip/TooltipTouch';
import { TooltipProps } from '../Tooltip';
import { props } from '../utils';
import { ObjectOverwrite } from 'typelevel-ts';

export type TextOverflowTouchProps = {
  label?: string | number,
  popover?: ObjectOverwrite<TooltipProps['popover'], {
    content?: void & string
  }>,
  id?: string,
  style?: object
};

@props(Props)
export default class TextOverflowTouch extends React.PureComponent<TextOverflowTouchProps> {

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
