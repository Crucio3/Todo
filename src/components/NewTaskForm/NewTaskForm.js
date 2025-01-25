import React, { useState } from 'react';

import './NewTaskForm.css';

const NewTaskForm = ({ addItem }) => {
  const [label, setLabel] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');

  const pressKey = (e) => {
    if (e.code === 'Enter' && label !== '') {
      addItem(label, minutes, seconds);
      setLabel('');
      setMinutes('');
      setSeconds('');
    }
  };

  const changeState = (e) => {
    const { name, value } = e.target;
    if (name === 'label') {
      setLabel(value);
    } else if (name === 'seconds') {
      setSeconds(value);
    } else if (name === 'minutes') {
      setMinutes(value);
    }
  };

  return (
    <header className="header">
      <h1>todos</h1>
      <form className="new-todo-form">
        <input
          className="new-todo"
          placeholder="Task"
          autoFocus
          onKeyDown={pressKey}
          name="label"
          onChange={changeState}
          value={label}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          name="minutes"
          onKeyDown={pressKey}
          onChange={changeState}
          value={minutes}
          onInput={(e) => {
            const value = e.target.value;
            let newValue = '';
            for (let i = 0; i < value.length; i++) {
              if (!isNaN(value[i]) && value[i] !== ' ') {
                newValue += value[i];
              }
            }
            e.target.value = newValue;
          }}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          name="seconds"
          onKeyDown={pressKey}
          onChange={changeState}
          value={seconds}
          onInput={(e) => {
            const value = e.target.value;
            let newValue = '';
            for (let i = 0; i < value.length; i++) {
              if (!isNaN(value[i]) && value[i] !== ' ') {
                newValue += value[i];
              }
            }
            e.target.value = newValue;
          }}
        />
      </form>
    </header>
  );
};

export default NewTaskForm;
