import React, { Component } from 'react';

import './TasksFilter.css';

class TasksFilter extends Component {
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

export default TasksFilter;
