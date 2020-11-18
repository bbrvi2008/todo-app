import React from 'react';

import './NewTaskForm.css';

const NewTaskForm = (props) => {
  
  return (
    <input className="new-todo" placeholder="What needs to be done?" autoFocus />
  );
};

export default NewTaskForm;