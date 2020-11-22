import React from 'react';
import PropTypes from 'prop-types';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const Task = ({ description, created, completed, onCompleteClick, onDeleteClick, onEditClick }) => {
  const createdText = formatDistanceToNow(created, { addSuffix: true, includeSeconds: true });

  return (
    <div className="view">
      <input className="toggle" type="checkbox" defaultChecked={completed} onClick={onCompleteClick} />
      <label>
        <span className="description">{description}</span>
        <span className="created">{`created ${createdText}`}</span>
      </label>
      <button type="button" aria-label="Edit" className="icon icon-edit" onClick={onEditClick} />
      <button type="button" aria-label="Delete" className="icon icon-destroy" onClick={onDeleteClick} />
    </div>
  );
};

Task.defaultProps = {
  description: '',
  created: new Date(),
  completed: false,
  onCompleteClick: () => null,
  onEditClick: () => null,
  onDeleteClick: () => null,
};

Task.propTypes = {
  description: PropTypes.string,
  created: PropTypes.instanceOf(Date),
  completed: PropTypes.bool,
  onCompleteClick: PropTypes.func,
  onEditClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
};

export default Task;
