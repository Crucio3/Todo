import React from 'react';

import './TasksFilter.css';

const TasksFilter = ({ filter, swapFilter }) => {
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
};

export default TasksFilter;
