import React, { Component } from 'react';

import './Task.css';

export default class Task extends Component {
  state = {
    label: this.props.item.label,
    editing: false,
    countingDown: this.props.item.countingDown,
  };

  inputRef = React.createRef();

  onEdit = (text) => {
    this.setState(
      ({ editing }) => ({ editing: !editing }),
      () => {
        this.inputRef.current.value = text;
        this.inputRef.current.focus();
      }
    );
  };

  pressKey = (e) => {
    if (e.code === 'Enter' && this.inputRef.current.value !== '') {
      this.setState({
        label: this.inputRef.current.value,
        editing: false,
      });
    }
  };

  render() {
    const { item, onDeleted, onDone } = this.props;
    const { done } = item;
    const { label, editing } = this.state;

    let classNames = '';

    if (done) {
      classNames += 'completed';
    } else if (editing) {
      classNames += ' editing';
    }

    return (
      <li className={classNames}>
        <div className="view">
          <input className="toggle" type="checkbox" checked={done} onChange={onDone} />
          <label>
            <span className="title" onClick={onDone}>
              {label}
            </span>
            <span className="description">
              <button
                className="icon icon-play"
                onClick={() => {
                  this.props.onTimer();
                }}
              ></button>
              <button
                className="icon icon-pause"
                onClick={() => {
                  this.props.offTimer();
                }}
              ></button>
              {item.minutes}:{item.seconds}
            </span>
            <span className="description">{`created ${item.timeSinceCreated}`}</span>
          </label>
          <button
            className="icon icon-edit"
            onClick={() => {
              this.onEdit(label);
            }}
          ></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
        <input type="text" className="edit" ref={this.inputRef} onKeyDown={this.pressKey} />
      </li>
    );
  }
}

Task.defaultProps = {
  item: {},
  onDeleted: () => {},
  onDone: () => {},
};

Task.propTypes = {
  item: (props, propName, componentName) => {
    const value = props[propName];

    if (typeof value === 'object') {
      return null;
    }

    return new Error(`${componentName}: ${propName} must be an object`);
  },
  onDeleted: (props, propName, componentName) => {
    const value = props[propName];

    if (typeof value === 'function') {
      return null;
    }

    return new Error(`${componentName}: ${propName} must be a function`);
  },
  onDone: (props, propName, componentName) => {
    const value = props[propName];

    if (typeof value === 'function') {
      return null;
    }

    return new Error(`${componentName}: ${propName} must be a function`);
  },
};
