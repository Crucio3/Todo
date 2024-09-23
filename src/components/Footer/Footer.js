import React, { Component } from 'react';

import './Footer.css';

import TasksFilter from '../TasksFilter/TasksFilter.js';

class Footer extends Component {
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

export default Footer;
