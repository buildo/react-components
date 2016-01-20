import React from 'react';
import { FlexView } from '../flex';

/**
 * ### Creates a full-page dimmed background for its children nodes
 */
const BackgroundDimmer = React.createClass({

  propTypes: {
    /**
     * children nodes/elements
     */
    children: React.PropTypes.node.isRequired,
    /**
     * background-color
     */
    color: React.PropTypes.string,
    /**
     * opacity
     */
    alpha: React.PropTypes.number,
    /**
     * z-index (BackgroundDimmer has `position: fixed`)
     */
    zIndex: React.PropTypes.number,
    /**
     * avoid propagation for scroll events
     */
    stopScrollPropagation: React.PropTypes.bool,
    /**
     * called when user clicks outside children
     */
    onClickOutside: React.PropTypes.func,
    className: React.PropTypes.string,
    id: React.PropTypes.string,
    style: React.PropTypes.object
  },

  getDefaultProps() {
    return {
      color: 'black',
      alpha: 0.5,
      zIndex: 99999
    };
  },

  componentDidMount() {
    if (this.props.stopScrollPropagation) {
      this.disableScrollPropagation();
    }
  },

  enableScrollPropagation() {
    const dimmedBackground = this.refs.dimmedBackground.getDOMNode();
    dimmedBackground.removeEventListener('wheel', this.stopScrollPropagation);
    dimmedBackground.removeEventListener('touchmove', this.stopScrollPropagation);
  },

  disableScrollPropagation() {
    const dimmedBackground = this.refs.dimmedBackground.getDOMNode();
    dimmedBackground.addEventListener('wheel', this.stopScrollPropagation);
    dimmedBackground.addEventListener('touchmove', this.stopScrollPropagation);
  },

  isEventOutsideChildren(e) {
    const el = e.target || e.srcElement;
    return el === this.refs.dimmedBackground.getDOMNode();
  },

  onClick(e) {
    const { onClickOutside } = this.props;
    if (onClickOutside && this.isEventOutsideChildren(e)) {
      onClickOutside(e);
    }
  },

  stopScrollPropagation(e) {
    const { stopScrollPropagation } = this.props;
    if (stopScrollPropagation && this.isEventOutsideChildren(e)) {
      e.preventDefault();
    }
  },

  getDimmedBackground() {
    const { color, alpha, zIndex } = this.props;
    const style = {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: color,
      opacity: String(alpha),
      zIndex
    };
    return <div style={style} onClick={this.onClick} ref='dimmedBackground' />;
  },

  render() {
    const { style, className, id, children, zIndex } = this.props;
    const props = {
      style: { position: 'relative', ...style },
      className,
      id
    };
    const flexViewProps = {
      style: {
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: (zIndex + 1), pointerEvents: 'none'
      },
      vAlignContent: 'center',
      hAlignContent: 'center'
    };
    const childrenWrapperProps = {
      style: { pointerEvents: 'auto' },
      ref: 'childrenWrapper'
    };

    return (
      <div {...props}>
        {this.getDimmedBackground()}
        <FlexView {...flexViewProps}>
          <div {...childrenWrapperProps}>
            {children}
          </div>
        </FlexView>
      </div>
    );
  },

  componentWillReceiveProps(nextProps) {
    if (!nextProps.stopScrollPropagation && this.props.stopScrollPropagation) {
      this.enableScrollPropagation();
    } else if (nextProps.stopScrollPropagation && !this.props.stopScrollPropagation) {
      this.disableScrollPropagation();
    }
  },

  componentWillUnmount() {
    if (this.props.stopScrollPropagation) {
      this.enableScrollPropagation();
    }
  }

});

export default BackgroundDimmer;
