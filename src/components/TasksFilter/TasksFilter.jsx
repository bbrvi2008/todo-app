import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import './TasksFilter.css';

const TasksFilter = ({ values, defaultValue, onChange }) => {
  const elements = values.map(({ id, value }) => {
    const classNames = cn({
      selected: defaultValue === value
    });

    return (
      <li key={id}>
        <button type="button" aria-label={value} className={classNames} onClick={() => onChange(value)}>
          {value}
        </button>
      </li>
    );
  });

  return <ul className="filters">{elements}</ul>;
};

TasksFilter.defaultProps = {
  values: [],
  defaultValue: '',
  onChange: () => null,
};

TasksFilter.propTypes = {
  values: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    value: PropTypes.string
  })),
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
};

export default TasksFilter;
