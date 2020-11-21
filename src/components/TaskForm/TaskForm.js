import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './TaskForm.css';

export default class TaskForm extends Component {
  static defaultProps = {
    defaultValue: '',
    className: '',
    onSubmit: () => null
  }

  static propTypes = {
    defaultValue: PropTypes.string,
    className: PropTypes.oneOf(['new-todo', 'edit']),
    onSubmit: PropTypes.func
  }

  constructor(props) {
    super(props);

    let { defaultValue } = props;
    this.state = {
      text: defaultValue
    };
  }

  handleTextChange = (e) => {
    this.setState({
      text: e.target.value
    })
  }

  handleFormSubmit = (e) => {
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
    let { className } = this.props;

    return (
      <form onSubmit={this.handleFormSubmit}>
        <input className={ className } 
          placeholder="What needs to be done?" 
          autoFocus
          onChange={this.handleTextChange}
          value={text} />
      </form>
    );
  }
}