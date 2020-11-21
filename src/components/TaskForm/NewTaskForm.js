import React from 'react';
import TaskForm from './TaskForm';

const NewTaskForm = (props) => (
  <TaskForm className="new-todo" {...props} />
);

export default NewTaskForm;