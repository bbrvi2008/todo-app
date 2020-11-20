import React from 'react';

import './TasksFilter.css'

const TasksFilter = ({ values, onSelectedFilter, filterDefault }) => {
  let elements = values.map(({ id, value }) => {
    let classNames = '';
    if(filterDefault === value) {
      classNames = 'selected';
    }
    
    return (
      <li key={ id } >
        <button 
          className={classNames}
          onClick={ () => onSelectedFilter(value) } >{ value }</button>
      </li>
    );
  });


  return (
    <ul className="filters">
      {elements}
    </ul>
  );
};

export default TasksFilter;