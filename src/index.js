import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { formatDistanceToNow } from 'date-fns';

import './index.css';

import NewTaskForm from './components/NewTaskForm/NewTaskForm.js';
import TaskList from './components/TaskList/TaskList.js';
import Footer from './components/Footer/Footer.js';

const root = ReactDOM.createRoot(document.getElementById('root'));

const TodoApp = () => {
  const [todoData, setTodoData] = useState([]);
  const [filter, setFilter] = useState('All');
  const [itemsLeft, setItemsLeft] = useState(0);
  const [id, setId] = useState(10);

  const getFiltered = () => {
    if (filter === 'Active') {
      return todoData.filter((item) => item.done === false);
    } else if (filter === 'Completed') {
      return todoData.filter((item) => item.done === true);
    }

    return todoData;
  };

  const addItem = (text, min, sec) => {
    setTodoData((s) => {
      let newObj = {
        label: text,
        id: id,
        done: false,
        edit: false,
        minutes: min,
        seconds: sec,
        countingDown: false,
        dateCreate: new Date(),
        timeSinceCreated: '',
      };
      const newArr = [...s, newObj];
      return newArr;
    });
    setId((s) => s + 1);
    setItemsLeft((s) => s + 1);
  };

  const deleteItem = (id) => {
    const item = todoData.find((item) => item.id === id);
    if (!item.done) {
      setItemsLeft((s) => s - 1);
    }

    setTodoData((s) => {
      let newState = s.filter((item) => item.id !== id);
      return newState;
    });
  };

  const doneItem = (id) => {
    setTodoData((s) => {
      let idx = s.findIndex((item) => item.id === id);
      let oldItem = s[idx];
      let newItem = { ...oldItem };

      if (!newItem.done) {
        setItemsLeft((s) => s - 1);
      } else {
        setItemsLeft((s) => s + 1);
      }

      newItem.done = !newItem.done;
      newItem.minutes = 0;
      newItem.seconds = 0;
      let newState = s.toSpliced(idx, 1, newItem);

      return newState;
    });
  };

  const onTimer = (id) => {
    setTodoData((s) => {
      const newState = s.map((item) => (item.id === id ? { ...item, countingDown: true } : item));
      return newState;
    });
  };

  const offTimer = (id) => {
    setTodoData((s) => {
      const newState = s.map((item) => (item.id === id ? { ...item, countingDown: false } : item));
      return newState;
    });
  };

  const timer = () => {
    setTodoData((s) => {
      const newTodoData = s.map((item) => {
        if (item.countingDown) {
          if (item.seconds > 0) {
            return { ...item, seconds: item.seconds - 1 };
          } else if (item.minutes > 0) {
            return { ...item, seconds: 59, minutes: item.minutes - 1 };
          } else {
            return { ...item, countingDown: false };
          }
        }
        return item;
      });
      return newTodoData;
    });
  };

  const deleteCompleted = () => {
    setTodoData((s) => {
      const newData = s.filter((item) => !item.done);
      return newData;
    });
  };

  const swapFilter = (newFilter) => {
    setFilter(newFilter);
  };

  const updateTimeSinceCreated = () => {
    setTodoData((s) => {
      const newTodoData = s.map((item) => {
        item.timeSinceCreated = formatDistanceToNow(item.dateCreate, { includeSeconds: true });
        return item;
      });
      return newTodoData;
    });
  };

  useEffect(() => {
    const timerForAll = setInterval(timer, 1000);
    const timeCreated = setInterval(updateTimeSinceCreated, 1000);
    return () => {
      clearInterval(timerForAll);
      clearInterval(timeCreated);
    };
  }, []);

  const filteredTodos = getFiltered();

  return (
    <div className="todoapp">
      <NewTaskForm addItem={addItem} />
      <TaskList todos={filteredTodos} onDeleted={deleteItem} onDone={doneItem} onTimer={onTimer} offTimer={offTimer} />
      <Footer itemsLeft={itemsLeft} deleteCompleted={deleteCompleted} filter={filter} swapFilter={swapFilter} />
    </div>
  );
};

root.render(<TodoApp />);
