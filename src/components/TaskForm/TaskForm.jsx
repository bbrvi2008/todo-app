import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './TaskForm.css';

export default class TaskForm extends Component {
  static defaultProps = {
    defaultValue: '',
    className: '',
    onSubmit: () => null,
  };

  static propTypes = {
    defaultValue: PropTypes.string,
    className: PropTypes.oneOf(['new-todo', 'edit']),
    onSubmit: PropTypes.func,
  };

  constructor(props) {
    super(props);

    const { defaultValue } = props;
    this.state = {
      text: defaultValue,
    };
  }

  handleTextChange = (event) => {
    this.setState({
      text: event.target.value,
    });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();

    const { text } = this.state;
    const { onSubmit } = this.props;

    onSubmit(text);
    this.setState({
      text: '',
    });
  };

  render() {
    const { text } = this.state;
    const { className } = this.props;

    return (
      <form onSubmit={this.handleFormSubmit}>
        <input
          className={className}
          placeholder="What needs to be done?"
          onChange={this.handleTextChange}
          value={text}
        />
      </form>
    );
  }
}
