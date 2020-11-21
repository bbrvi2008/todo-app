import React from 'react';
import TaskForm from './TaskForm';

const EditTaskForm = (props) => (
  <TaskForm className="edit" {...props} />
);

export default EditTaskForm;