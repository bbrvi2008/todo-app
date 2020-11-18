import React from 'react';

import Task from '../Task';

import './TaskList.css';

const TaskList = ({ tasks }) => {

  let elements = tasks.map((item) => {
    let {id, completed, editing = false, ...task} = item;
    let className = completed ? 'completed' : '';
    className = editing ? 'editing' : '';

    let editInput = editing
      ? (<input type="text" className="edit" defaultValue={task.description} />)
      : null;

    return (
      <li className={className} key={id} >
        <Task {...task} />
        {editInput}
      </li>
    );
  })

  return (
    <ul className="todo-list">
      {elements}
    </ul>
  );
};

export default TaskList;
