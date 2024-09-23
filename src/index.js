import React, { Component } from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';

import NewTaskForm from './components/NewTaskForm/NewTaskForm.js';
import TaskList from './components/TaskList/TaskList.js';
import Footer from './components/Footer/Footer.js';

const root = ReactDOM.createRoot(document.getElementById('root'));

class TodoApp extends Component {
  state = {
    todoData: [],
    filter: 'All',
  };

  id = 100;
  itemsLeft = 0;

  deleteItem = (id) => {
    this.itemsLeft -= 1;
    this.setState(({ todoData }) => {
      let newState = todoData.filter((item) => item.id !== id);
      return { todoData: newState };
    });
  };

  addItem = (text) => {
    this.setState(({ todoData }) => {
      let newObj = {
        label: text,
        id: this.id++,
        done: false,
        edit: false,
      };

      this.itemsLeft += 1;

      let newArr = [...todoData, newObj];
      return { todoData: newArr };
    });
  };

  doneItem = (id) => {
    this.setState(({ todoData }) => {
      let idx = todoData.findIndex((item) => item.id === id);
      let oldItem = todoData[idx];
      let newItem = { ...oldItem };

      if (!newItem.done) {
        this.itemsLeft -= 1;
      } else {
        this.itemsLeft += 1;
      }

      newItem.done = !newItem.done;
      let newState = todoData.toSpliced(idx, 1, newItem);

      return { todoData: newState };
    });
  };

  getFiltered = () => {
    const { todoData, filter } = this.state;
    if (filter === 'Active') {
      return todoData.filter((item) => item.done === false);
    } else if (filter === 'Completed') {
      return todoData.filter((item) => item.done === true);
    }

    return todoData;
  };

  swapFilter = (newFilter) => {
    this.setState({ filter: newFilter });
  };

  deleteCompleted = () => {
    this.setState(({ todoData }) => {
      let newData = todoData.filter((item) => !item.done);
      return { todoData: newData };
    });
  };

  onEdit = () => {};

  render() {
    const filteredTodos = this.getFiltered();

    return (
      <div className="todoapp">
        <NewTaskForm addItem={this.addItem} />
        <TaskList todos={filteredTodos} onDeleted={this.deleteItem} onDone={this.doneItem} />
        <Footer
          itemsLeft={this.itemsLeft}
          deleteCompleted={this.deleteCompleted}
          filter={this.state.filter}
          swapFilter={this.swapFilter}
        />
      </div>
    );
  }
}

root.render(<TodoApp />);
