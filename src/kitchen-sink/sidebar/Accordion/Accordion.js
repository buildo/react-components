import React from 'react';
import { FlexView } from '../../../flex';
import Icon from '../../../Icon';

import './accordion.scss';

export default class Accordion extends React.Component {

  static propTypes = {
    children: React.PropTypes.node.isRequired,
    title: React.PropTypes.string,
    isOpen: React.PropTypes.bool,
    onToggle: React.PropTypes.func
  };

  static defaultProps = {
    onToggle: () => {}
  };

  constructor(props) {
    super(props);
    this.state = { isOpen: true };
  }

  toggleOpen = () => {
    const { onToggle } = this.props;
    if (onToggle) {
      onToggle();
    } else {
      this.setState({ isOpen: !this.state.isOpen });
    }
  };

  render() {
    const { children, title, isOpen } = this.props;
    const showContent = typeof isOpen !== 'undefined' ? isOpen : this.state.isOpen;
    return (
      <div className='accordion'>
        <FlexView className='header' onClick={this.toggleOpen}>
          <div>{title}</div>
          <FlexView marginLeft='auto' shrink={false}>
            <Icon icon={showContent ? 'angle-up' : 'angle-down'} />
          </FlexView>
        </FlexView>
        {showContent &&
          <div className='content'>
            {children}
          </div>
        }
      </div>
    );
  }

}
