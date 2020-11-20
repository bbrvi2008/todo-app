import React from 'react';

import TasksFilter from '../TasksFilter';

import './Footer.css'

const Footer = ({ countTasksActive, tasksFilter, onSelectedFilter, filterDefault, onClearCompleted }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{`${countTasksActive} items left`}</span>
      <TasksFilter 
        values={ tasksFilter } 
        onSelectedFilter={ onSelectedFilter }
        filterDefault={ filterDefault } />
      <button className="clear-completed"
        onClick={ onClearCompleted } >Clear completed</button>
    </footer>
  );
};

export default Footer;