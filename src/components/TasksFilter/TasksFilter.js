import React, { Component } from 'react';

import './TasksFilter.css';

export default class TasksFilter extends Component {
  render() {
    const { filter, swapFilter } = this.props;
    return (
      <ul className="filters">
        <li>
          <button
            className={filter === 'All' ? 'selected' : null}
            onClick={() => {
              swapFilter('All');
            }}
          >
            All
          </button>
        </li>
        <li>
          <button
            className={filter === 'Active' ? 'selected' : null}
            onClick={() => {
              swapFilter('Active');
            }}
          >
            Active
          </button>
        </li>
        <li>
          <button
            className={filter === 'Completed' ? 'selected' : null}
            onClick={() => {
              swapFilter('Completed');
            }}
          >
            Completed
          </button>
        </li>
      </ul>
    );
  }
}

TasksFilter.defaultProps = {
  filter: 'All',
  swapFilter: () => {},
};

TasksFilter.propTypes = {
  filter: (props, propName, componentName) => {
    const value = props[propName];

    if (typeof value === 'string') {
      return null;
    }

    return new Error(`${componentName}: ${propName} must be string`);
  },

  swapFilter: (props, propName, componentName) => {
    const value = props[propName];

    if (typeof value === 'function') {
      return null;
    }

    return new Error(`${componentName}: ${propName} must be function`);
  },
};
