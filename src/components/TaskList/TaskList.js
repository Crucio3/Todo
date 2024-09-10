import React from "react";

import "./TaskList.css";

import Tasks from "../Task/Task";

const TaskList = ({ todos, condition }) => {
  const elements = todos.map((item) => {
    return (
      <li className={item.condition} key={item.id}>
        <Tasks label={item.label} />
      </li>
    );
  });

  return <ul className="todo-list">{elements}</ul>;
};

export default TaskList;
