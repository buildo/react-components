import React from 'react';
import Menu from '../../src/menu'

const onClick = (option) => {
  console.log(option.title);
};

const options = [
  {
    type: 'title',
    title: 'Actions'
  },
  {
    type: 'item',
    title: 'Validate',
    metadata: 'F7',
    onClick: onClick
  },
  {
    type: 'item',
    title: 'Close',
    metadata: 'SHIFT+F11',
    onClick: onClick
  },
  {
    type: 'divider'
  },
  {
    type: 'title',
    title: 'Tracking'
  },
  {
    type: 'item',
    title: 'Change Tracking',
    onClick: onClick
  }
];

const Example = React.createClass({

  propTypes: {},

  getTemplate() {
    return (
      <div>
        <Menu iconClassName='ellipsis vertical icon' options={options}>
        </Menu>
      </div>
    );
  },

  render() {
    return this.getTemplate();
  }

});

export default Example;
