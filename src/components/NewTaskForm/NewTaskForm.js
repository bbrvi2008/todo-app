import React, { Component } from 'react';

import './NewTaskForm.css';

export default class NewTaskForm extends Component {
  constructor(props) {
    super(props);

    let { defaultValue = '' } = props;
    this.state = {
      text: defaultValue
    };
  }

  onChangeText = (e) => {
    this.setState({
      text: e.target.value
    })
  }

  onSubmit = (e) => {
    e.preventDefault();

    let { text } = this.state;
    let { onSubmit } = this.props;

    onSubmit(text);
    this.setState({
      text: ''
    });
  }

  render() {
    let { text } = this.state;
    let { className = 'new-todo' } = this.props;

    return (
      <form onSubmit={this.onSubmit}>
        <input className={ className } 
          placeholder="What needs to be done?" 
          autoFocus
          onChange={this.onChangeText}
          value={text} />
      </form>
    );
  }
}