import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';

import './Task.css';

export default class Task extends Component {
  state = {
    label: this.props.item.label,
    editing: false,
    dateCreate: new Date(),
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
      this.setState(() => {
        return { label: this.inputRef.current.value, editing: false };
      });
    }
  };

  render() {
    const { item, onDeleted, onDone } = this.props;
    const { done } = item;
    const { dateCreate, label, editing } = this.state;

    let classNames = '';

    if (done) {
      classNames += 'completed';
    } else if (editing) {
      classNames += ' editing';
    }

    return (
      <li className={classNames}>
        <div className="view">
          <input className="toggle" type="checkbox" onClick={onDone} />
          <label>
            <span className="description" onClick={onDone}>
              {label}
            </span>
            <span className="created">
              {`created ${formatDistanceToNow(dateCreate, {
                includeSeconds: true,
              })}`}
            </span>
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
