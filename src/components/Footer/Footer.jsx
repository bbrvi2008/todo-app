import React from 'react';
import PropTypes from 'prop-types';

import TasksFilter from '../TasksFilter';

import './Footer.css';

const Footer = ({ countTasksActive, tasksFilterValues, onFilterChange, filterValue, onClearCompletedClick }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{`${countTasksActive} items left`}</span>
      <TasksFilter values={tasksFilterValues} defaultValue={filterValue} onChange={onFilterChange} />
      <button type="button" className="clear-completed" onClick={onClearCompletedClick}>
        Clear completed
      </button>
    </footer>
  );
};

Footer.defaultProps = {
  countTasksActive: 0,
  tasksFilterValues: [],
  filterValue: '',
  onFilterChange: () => null,
  onClearCompletedClick: () => null,
};

Footer.propTypes = {
  countTasksActive: PropTypes.number,
  tasksFilterValues: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    value: PropTypes.string
  })),
  filterValue: PropTypes.string,
  onFilterChange: PropTypes.func,
  onClearCompletedClick: PropTypes.func,
};

export default Footer;
