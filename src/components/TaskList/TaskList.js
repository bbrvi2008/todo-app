import React, { Component } from 'react';

import Task from '../Task';

import './TaskList.css';

export default class TaskList extends Component {
  render() {
    let { tasks, onDeleted, onCompleted } = this.props;

    let elements = tasks.map((item) => {
      let {id, editing = false, ...task} = item;

      let classNames = '';
      if(task.completed) {
        classNames = 'completed' 
      }

      if(editing) {
        classNames = 'editing';
      }
  
      let editInput = editing
        ? (<input type="text" className="edit" defaultValue={task.description} />)
        : null;
  
      return (
        <li className={classNames} key={id} >
          <Task {...task}
            onDeleteClick={ () => onDeleted(id) }
            onCompleteClick={ () => onCompleted(id) } />
          {editInput}
        </li>
      );
    })
  
    return (
      <ul className="todo-list">
        {elements}
      </ul>
    );
  }
}
