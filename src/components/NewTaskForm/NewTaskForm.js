import React, { Component } from 'react';

import './NewTaskForm.css';

export default class NewTaskForm extends Component {
  state = {
    label: '',
    minutes: '',
    seconds: '',
  };

  inputRef = React.createRef();

  pressKey = (e) => {
    const { addItem } = this.props;
    const { label, minutes, seconds } = this.state;
    if (e.code === 'Enter' && this.label !== '') {
      addItem(label, minutes, seconds);
      this.setState({
        label: '',
        minutes: '',
        seconds: '',
      });
    }
  };

  changeState = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <form className="new-todo-form">
          <input
            className="new-todo"
            placeholder="Task"
            autoFocus
            onKeyDown={this.pressKey}
            name="label"
            onChange={this.changeState}
            value={this.state.label}
          />
          <input
            className="new-todo-form__timer"
            placeholder="Min"
            name="minutes"
            onKeyDown={this.pressKey}
            onChange={this.changeState}
            value={this.state.minutes}
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
            onKeyDown={this.pressKey}
            onChange={this.changeState}
            value={this.state.seconds}
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
  }
}

NewTaskForm.defaultProps = {
  addItem: () => {},
};

NewTaskForm.propTypes = {
  addItem: (props, propName, componentName) => {
    const value = props[propName];

    if (typeof value === 'function') {
      return null;
    }

    return new Error(`${componentName}: ${propName} must be function`);
  },
};
