import React from 'react';
import cx from 'classnames';

export default class Item extends React.Component {

  static propTypes = {
    sectionId: React.PropTypes.string.isRequired,
    id: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    active: React.PropTypes.bool.isRequired,
    onClick: React.PropTypes.func.isRequired
  };

  onClick = () => this.props.onClick(this.props.sectionId, this.props.id);

  render() {
    const { active, title } = this.props;
    return (
      <a className={cx('item', { active })} onClick={this.onClick} style={{ display: 'block' }}>
        {title}
      </a>
    );
  }

}
