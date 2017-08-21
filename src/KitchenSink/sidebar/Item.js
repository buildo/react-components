import React from 'react';
import cx from '../../utils/classnames';
import { props, t } from '../../utils';

@props({
  sectionId: t.String,
  id: t.String,
  title: t.String,
  active: t.Boolean,
  onClick: t.Function
})
export default class Item extends React.Component {

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
