import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './TaskForm.css';

const TaskForm = ({ defaultValue, className, onSubmit }) => {
  const [ text, setText ] = useState(defaultValue);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    onSubmit(text);
    setText('');
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        className={className}
        placeholder="What needs to be done?"
        onChange={handleTextChange}
        value={text}
      />
    </form>
  );
}

TaskForm.defaultProps = {
  defaultValue: '',
  className: '',
  onSubmit: () => null,
};

TaskForm.propTypes = {
  defaultValue: PropTypes.string,
  className: PropTypes.oneOf(['new-todo', 'edit']),
  onSubmit: PropTypes.func,
};

export default TaskForm;