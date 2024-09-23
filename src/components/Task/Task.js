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
    const { dateCreate } = this.state;

    let classNames = '';

    if (done) {
      classNames += 'completed';
    } else if (this.state.editing) {
      classNames += ' editing';
    }

    return (
      <li className={classNames}>
        <div className="view">
          <input className="toggle" type="checkbox" onClick={onDone} />
          <label>
            <span className="description" onClick={onDone}>
              {this.state.label}
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
              this.onEdit(this.state.label);
            }}
          ></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
        <input type="text" className="edit" ref={this.inputRef} onKeyDown={this.pressKey} />
      </li>
    );
  }
}
