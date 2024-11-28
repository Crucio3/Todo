import React from 'react';

import './TaskList.css';

import Tasks from '../Task/Task.js';

const TaskList = ({ todos = [], onDeleted = () => {}, onDone = () => {}, onTimer, offTimer, timer }) => {
  const elements = todos.map((item) => {
    let { id } = item;
    return (
      <Tasks
        item={item}
        onDeleted={() => onDeleted(id)}
        onDone={() => {
          onDone(id);
        }}
        key={id}
        onTimer={() => {
          onTimer(id);
        }}
        offTimer={() => {
          offTimer(id);
        }}
        timer={() => {
          timer(id);
        }}
      />
    );
  });

  return <ul className="todo-list">{elements}</ul>;
};

TaskList.propTypes = {
  todos: (props, propName, componentName) => {
    const value = props[propName];

    if (Array.isArray(value)) {
      return null;
    }

    return new Error(`${componentName}: ${propName} must be object`);
  },
  onDeleted: (props, propName, componentName) => {
    const value = props[propName];

    if (typeof value === 'function') {
      return null;
    }

    return new Error(`${componentName}: ${propName} must be function`);
  },

  onDone: (props, propName, componentName) => {
    const value = props[propName];

    if (typeof value === 'function') {
      return null;
    }

    return new Error(`${componentName}: ${propName} must be function`);
  },
};
export default TaskList;
