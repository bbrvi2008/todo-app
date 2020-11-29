import React, { Component } from 'react';
import PropTypes from 'prop-types';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { format, addSeconds } from 'date-fns'

export default class Task extends Component {
  static defaultProps = {
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
  
  static propTypes = {
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

  componentDidMount() {
    const { startTimer } = this.props;

    if(startTimer) {
      this.intervalId = setInterval(this.onForceUpdate, 1000);
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  handlePlayClick = () => {
    const { startTimer, onTimerPlay } = this.props; 
    if(startTimer) return;

    onTimerPlay();

    this.intervalId = setInterval(this.onForceUpdate, 1000);
  }

  handlePauseClick = () => {
    const { startTimer, onTimerPause } = this.props;
    if(!startTimer) return;

    const newAmountTime = this.getAmountTime();
    onTimerPause(newAmountTime);

    clearInterval(this.intervalId);
  }

  onForceUpdate = () => {
    this.forceUpdate();
  }

  formattedTime = (seconds) => {
    if(seconds === 0) return null;
  
    const helperDate = addSeconds(new Date(0), seconds);
    return format(helperDate, 'mm:ss');
  }

  getAmountTime = () => {
    const { timer, startTimer } = this.props;
    if(!startTimer) return timer;

    return timer + ((new Date()).getTime() - startTimer.getTime()) / 1000;
  }

  render() {
    const { description, created, completed, onCompleteClick, onDeleteClick, onEditClick } = this.props;
    const createdText = formatDistanceToNow(created, { addSuffix: true, includeSeconds: true });
    const timerText = this.formattedTime(this.getAmountTime());

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
              onClick={this.handlePlayClick} />
            <button 
              type="button" 
              aria-label="Pause" 
              className="icon icon-pause"
              onClick={this.handlePauseClick} />
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
}