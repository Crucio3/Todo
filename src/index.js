import React from "react";
import ReactDOM from "react-dom";

import "./index.css";

import NewTaskForm from "./components/NewTaskForm/NewTaskForm";
import TaskList from "./components/TaskList/TaskList";
import Footer from "./components/Footer/Footer";

const root = ReactDOM.createRoot(document.getElementById("root"));

const TodoApp = () => {
  const todoData = [
    { label: "Задача 1", condition: "completed", id: 1 },
    { label: "Задача 2", condition: "", id: 2 },
    { label: "Задача 3", condition: "completed", id: 3 },
    { label: "Задача 4", condition: "", id: 4 },
  ];

  return (
    <div className="todoapp">
      <NewTaskForm />
      <TaskList todos={todoData} />
      <Footer />
    </div>
  );
};

root.render(<TodoApp />);
