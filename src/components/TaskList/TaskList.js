import React from 'react';

import './TaskList.css';

import Tasks from '../Task/Task.js';

const TaskList = ({ todos, onDeleted, onDone }) => {
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
      />
    );
  });

  return <ul className="todo-list">{elements}</ul>;
};

export default TaskList;
