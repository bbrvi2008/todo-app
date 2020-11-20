import React from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const Task = ({ description, created, completed, onCompleteClick, onDeleteClick, onEditingClick }) => {
  let createdText = created && formatDistanceToNow(created, { addSuffix: true });
  
  return (
    <div className="view">
      <input className="toggle" type="checkbox"
        defaultChecked={completed}
        onClick={onCompleteClick} />
      <label>
        <span className="description">{ description }</span>
        <span className="created">{ createdText }</span>
      </label>
      <button className="icon icon-edit"
        onClick={ onEditingClick } ></button>
      <button className="icon icon-destroy"
        onClick={ onDeleteClick } ></button>
    </div>
  );
};

export default Task;