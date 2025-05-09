import React, { useState, useRef } from 'react';

import './Task.css';

const Task = ({ item, onDeleted, onDone, offTimer, onTimer }) => {
  const inputRef = useRef(null);

  const [label, setLabel] = useState(item.label);
  const [editing, setEditing] = useState(false);

  let classNames = '';

  if (item.done) {
    classNames += 'completed';
  } else if (editing) {
    classNames += ' editing';
  }

  const pressKey = (e) => {
    if (e.code === 'Enter' && inputRef.current.value !== '') {
      setLabel(inputRef.current.value);
      setEditing(false);
    }
  };

  const onEdit = (text) => {
    setEditing((editing) => !editing);
    inputRef.current.value = text;
    inputRef.current.focus();
  };

  return (
    <li className={classNames}>
      <div className="view">
        <input className="toggle" type="checkbox" checked={item.done} onChange={onDone} />
        <label>
          <span className="title" onClick={onDone}>
            {label}
          </span>
          <span className="description">
            <button
              className="icon icon-play"
              onClick={() => {
                onTimer();
              }}
            ></button>
            <button
              className="icon icon-pause"
              onClick={() => {
                offTimer();
              }}
            ></button>
            {item.minutes}:{item.seconds}
          </span>
          <span className="description">{`created ${item.timeSinceCreated}`}</span>
        </label>
        <button
          className="icon icon-edit"
          onClick={() => {
            onEdit(label);
          }}
        ></button>
        <button className="icon icon-destroy" onClick={onDeleted}></button>
      </div>
      <input type="text" className="edit" ref={inputRef} onKeyDown={pressKey} />
    </li>
  );
};

export default Task;
