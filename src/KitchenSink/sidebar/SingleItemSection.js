import React from 'react';
import cx from 'classnames';
import FlexView from 'react-flexview';
import { props, t } from '../../utils';

@props({
  sectionId: t.String,
  id: t.String,
  title: t.String,
  active: t.Boolean,
  onClick: t.Function
})
export class SingleItemSection extends React.Component {

  onClick = () => this.props.onClick(this.props.sectionId, this.props.id);

  render() {
    const { active, title } = this.props;
    return (
      <FlexView
        className={cx('single-item-section', { active })}
        onClick={this.onClick}
        vAlignContent='center'
      >
        {title}
      </FlexView>
    );
  }

}
