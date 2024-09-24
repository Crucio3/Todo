import React, { Component } from 'react';

import './NewTaskForm.css';

export default class NewTaskForm extends Component {
  state = {
    label: '',
  };

  inputRef = React.createRef();

  pressKey = (e) => {
    const { addItem } = this.props;
    const inputValue = this.inputRef.current.value;
    this.setState(({ label }) => {
      return { label: label + inputValue };
    });
    if (e.code === 'Enter' && inputValue !== '') {
      addItem(inputValue);
      this.inputRef.current.value = '';
    }
  };

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          ref={this.inputRef}
          onKeyDown={this.pressKey}
        />
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
