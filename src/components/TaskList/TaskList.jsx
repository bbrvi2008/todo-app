import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Task from '../Task';
import { EditTaskForm } from '../TaskForm';

import './TaskList.css';

export default class TaskList extends Component {
  static defaultProps = {
    tasks: [],
    onDeleteClick: () => null,
    onCompleteClick: () => null,
    onEditClick: () => null,
    onEditFormSubmit: () => null,
    onTimerPlay: () => null,
    onTimerPause: () => null
  };

  static propTypes = {
    tasks: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        created: PropTypes.instanceOf(Date).isRequired,
        completed: PropTypes.bool.isRequired,
        editing: PropTypes.bool,
      })
    ),
    onDeleteClick: PropTypes.func,
    onCompleteClick: PropTypes.func,
    onEditClick: PropTypes.func,
    onEditFormSubmit: PropTypes.func,
    onTimerPlay: PropTypes.func,
    onTimerPause: PropTypes.func
  };

  createHandlerEditFormSubmit = (task) => {
    const { onEditFormSubmit } = this.props;

    return (text) => {
      onEditFormSubmit(task, text);
    };
  };

  render() {
    const { tasks, onDeleteClick, onCompleteClick, onEditClick, onTimerPlay, onTimerPause } = this.props;

    const elements = tasks.map((item) => {
      const { id, ...task } = item;
      const { editing } = task;

      let classNames = '';
      if (task.completed) {
        classNames = 'completed';
      }

      if (editing) {
        classNames = 'editing';
      }

      const editInput = editing ? (
        <EditTaskForm onSubmit={this.createHandlerEditFormSubmit(item)} defaultValue={task.description} />
      ) : null;

      return (
        <li className={classNames} key={id}>
          <Task
            {...task}
            onDeleteClick={() => onDeleteClick(id)}
            onCompleteClick={() => onCompleteClick(id)}
            onEditClick={() => onEditClick(id)}
            onTimerPlay={() => onTimerPlay(id)}
            onTimerPause={(timer) => onTimerPause(id, timer)}
          />
          {editInput}
        </li>
      );
    });

    return <ul className="todo-list">{elements}</ul>;
  }
}
