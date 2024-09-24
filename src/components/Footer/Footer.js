import React, { Component } from 'react';

import './Footer.css';

import TasksFilter from '../TasksFilter/TasksFilter.js';

export default class Footer extends Component {
  render() {
    const { itemsLeft, deleteCompleted, filter, swapFilter } = this.props;
    return (
      <footer className="footer">
        <span className="todo-count">{itemsLeft} items left</span>
        <TasksFilter
          filter={filter}
          swapFilter={(text) => {
            swapFilter(text);
          }}
        />
        <button
          className="clear-completed"
          onClick={() => {
            deleteCompleted();
          }}
        >
          Clear completed
        </button>
      </footer>
    );
  }
}

Footer.defaultProps = {
  itemsLeft: 0,
  deleteCompleted: () => {},
  swapFilter: () => {},
  filter: 'All',
};

Footer.propTypes = {
  itemsLeft: (props, propName, componentName) => {
    const value = props[propName];

    if (typeof value === 'number') {
      return null;
    }

    return new Error(`${componentName}: ${propName} must be number`);
  },
  deleteCompleted: (props, propName, componentName) => {
    const value = props[propName];

    if (typeof value === 'function') {
      return null;
    }

    return new Error(`${componentName}: ${propName} must be function`);
  },

  swapFilter: (props, propName, componentName) => {
    const value = props[propName];

    if (typeof value === 'function') {
      return null;
    }

    return new Error(`${componentName}: ${propName} must be function`);
  },

  filter: (props, propName, componentName) => {
    const value = props[propName];

    if (typeof value === 'string') {
      return null;
    }

    return new Error(`${componentName}: ${propName} must be string`);
  },
};
