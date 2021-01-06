import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import Task from '../Task';
import { EditTaskForm } from '../TaskForm';

import './TaskList.css';

const TaskList = ({ tasks, onDeleteClick, onCompleteClick, onEditClick, onTimerPlay, onTimerPause, onEditFormSubmit }) => {
  const createHandlerEditFormSubmit = (task) => {
    return (text) => {
      onEditFormSubmit(task, text);
    };
  };

  const elements = tasks.map((item) => {
    const { id, ...task } = item;
    const { editing, completed } = task;

    const classNames = cn({
      completed: !editing && completed,
      editing
    });

    const editInput = editing ? (
      <EditTaskForm onSubmit={createHandlerEditFormSubmit(item)} defaultValue={task.description} />
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

TaskList.defaultProps = {
  tasks: [],
  onDeleteClick: () => null,
  onCompleteClick: () => null,
  onEditClick: () => null,
  onEditFormSubmit: () => null,
  onTimerPlay: () => null,
  onTimerPause: () => null
};

TaskList.propTypes = {
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

export default TaskList;