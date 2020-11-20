import React, { Component } from 'react';

import Task from '../Task';
import NewTaskForm from '../NewTaskForm';

import './TaskList.css';

export default class TaskList extends Component {
  editedItem = (task) => {
    let { onEdited } = this.props;

    return (text) => {
      onEdited(task, text);
    }
  }

  render() {
    let { tasks, onDeleted, onCompleted, onEditing } = this.props;

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
        ? (<NewTaskForm 
            onSubmit={ this.editedItem(item) }
            defaultValue={task.description}
            className='edit' />)
        : null;
  
      return (
        <li className={classNames} key={id} >
          <Task {...task}
            onDeleteClick={ () => onDeleted(id) }
            onCompleteClick={ () => onCompleted(id) }
            onEditingClick={ () => onEditing(id) } />
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
