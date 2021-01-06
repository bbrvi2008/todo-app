import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { format, addSeconds } from 'date-fns'

const Task = ({ timer, description, created, completed, startTimer, onCompleteClick, onDeleteClick, onEditClick, onTimerPlay, onTimerPause }) => {
  const formattedTime = (seconds) => {
    if(seconds === 0) return null;
  
    const helperDate = addSeconds(new Date(0), seconds);
    return format(helperDate, 'mm:ss');
  }

  const getAmountTime = () => {
    if(!startTimer) return timer;

    return timer + ((new Date()).getTime() - startTimer.getTime()) / 1000;
  }

  const [ timerText, setTimerText ] = useState(formattedTime(getAmountTime()));

  const onForceUpdate = () => {
    setTimerText(formattedTime(getAmountTime()));
  }

  useEffect(() => {
    let intervalId = null;

    if(startTimer) {
      intervalId = setInterval(onForceUpdate, 1000);
    }

    return () => {
      if(intervalId) {
        clearInterval(intervalId);
      }
    }
  });

  const handlePlayClick = () => {
    if(startTimer) return;

    onTimerPlay();
  }

  const handlePauseClick = () => {
    if(!startTimer) return;

    const newAmountTime = getAmountTime();
    onTimerPause(newAmountTime);
  }

  const createdText = formatDistanceToNow(created, { addSuffix: true, includeSeconds: true });

  return (
    <div className="view">
      <input className="toggle" type="checkbox" defaultChecked={completed} onClick={onCompleteClick} />
      <label>
        <span className="title">{description}</span>
        <span className="description">
          <button 
            type="button" 
            aria-label="Play" 
            className="icon icon-play"
            onClick={handlePlayClick} />
          <button 
            type="button" 
            aria-label="Pause" 
            className="icon icon-pause"
            onClick={handlePauseClick} />
          {timerText}
        </span>
        <span className="description">{createdText}</span>
      </label>
      <button 
        type="button" 
        aria-label="Edit" 
        className="icon icon-edit" 
        onClick={onEditClick} />
      <button 
        type="button" 
        aria-label="Delete" 
        className="icon icon-destroy" 
        onClick={onDeleteClick} />
    </div>
  );
}

Task.defaultProps = {
  description: '',
  timer: 0,
  startTimer: null,
  created: new Date(),
  completed: false,
  onCompleteClick: () => null,
  onEditClick: () => null,
  onDeleteClick: () => null,
  onTimerPlay: () => null,
  onTimerPause: () => null
};

Task.propTypes = {
  description: PropTypes.string,
  timer: PropTypes.number,
  startTimer: PropTypes.instanceOf(Date),
  created: PropTypes.instanceOf(Date),
  completed: PropTypes.bool,
  onCompleteClick: PropTypes.func,
  onEditClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
  onTimerPlay: PropTypes.func,
  onTimerPause: PropTypes.func
};

export default Task;