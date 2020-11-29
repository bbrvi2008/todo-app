import React, { Component } from 'react';

import Footer from '../Footer';
import TaskList from '../TaskList';
import { NewTaskForm } from '../TaskForm';

import './TodoApp.css';

export default class TodoApp extends Component {
  maxId = 100;

  state = {
    tasksData: [
      this.createTask('Completed task', true),
      this.createTask('Editing task'),
      this.createTask('Active task'),
    ],
    tasksFilterValues: [
      { id: 1, value: 'All' },
      { id: 2, value: 'Active' },
      { id: 3, value: 'Completed' },
    ],
    filterValue: 'All',
  };

  handleNewFormSubmit = (text) => {
    this.setState(({ tasksData }) => {
      const newItem = this.createTask(text);

      return {
        tasksData: this.addItem(tasksData, newItem),
      };
    });
  };

  handleEditFormSubmit = (oldItem, text) => {
    this.setState(({ tasksData }) => {
      const newItem = {
        ...oldItem,
        description: text,
        editing: false,
      };

      return {
        tasksData: this.relaceItem(tasksData, newItem),
      };
    });
  };

  handleCompleteClick = (id) => {
    this.setState(({ tasksData }) => {
      return {
        tasksData: this.toggleItemProperty(tasksData, id, 'completed'),
      };
    });
  };

  handleEditClick = (id) => {
    this.setState(({ tasksData }) => {
      return {
        tasksData: this.toggleItemProperty(tasksData, id, 'editing'),
      };
    });
  };

  handleDeleteClick = (id) => {
    this.setState(({ tasksData }) => {
      return {
        tasksData: this.deleteItem(tasksData, id),
      };
    });
  };

  handleTimerPause = (id, timer) => {
    this.setState(({ tasksData }) => {
      return {
        tasksData: this.updateItemProperties(tasksData, id, {
          timer,
          startTimer: null
        }),
      };
    });
  }

  handleTimerPlay = (id) => {
    this.setState(({ tasksData }) => {
      return {
        tasksData: this.updateItemProperties(tasksData, id, {
          startTimer: new Date()
        }),
      };
    });
  }

  handleFilterChange = (value) => {
    this.setState({
      filterValue: value,
    });
  };

  handleClearCompletedClick = () => {
    this.setState(({ tasksData }) => {
      return {
        tasksData: tasksData.filter(({ completed }) => !completed),
      };
    });
  };

  getUniqueId() {
    this.maxId += 1;
    return this.maxId;
  }

  getTasksByFilter(tasksData, filterValue) {
    switch (filterValue) {
      case 'All':
        return tasksData;
      case 'Completed':
        return tasksData.filter(({ completed }) => completed);
      case 'Active':
        return tasksData.filter(({ completed }) => !completed);
      default:
        return [];
    }
  }

  toggleItemProperty(arr, id, propName) {
    return arr.map((item) => {
      const { id: itemId } = item;

      let result = item;
      if (itemId === id) {
        result = {
          ...item,
          [propName]: !item[propName],
        };
      }

      return result;
    });
  }

  updateItemProperties(arr, id, props) {
    return arr.map((item) => {
      const { id: itemId } = item;

      let result = item;
      if (itemId === id) {
        result = {
          ...item,
          ...props,
        };
      }

      return result;
    });
  }

  relaceItem(arr, newItem) {
    return arr.map((item) => {
      const { id: itemId } = item;

      return itemId === newItem.id ? newItem : item;
    });
  }

  addItem(arr, item) {
    return [...arr, item];
  }

  deleteItem(arr, id) {
    return arr.filter(({ id: itemId }) => {
      return itemId !== id;
    });
  }

  createTask(text, completed = false) {
    return {
      id: this.getUniqueId(),
      description: text,
      created: new Date(),
      completed,
      timer: 0,
      startTimer: null,
      editing: false
    };
  }

  render() {
    const { tasksData, tasksFilterValues, filterValue } = this.state;

    const filteredTasksData = this.getTasksByFilter(tasksData, filterValue);
    const countTasksActive = this.getTasksByFilter(tasksData, 'Active').length;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm onSubmit={this.handleNewFormSubmit} />
        </header>
        <section className="main">
          <TaskList
            tasks={filteredTasksData}
            onDeleteClick={this.handleDeleteClick}
            onCompleteClick={this.handleCompleteClick}
            onEditClick={this.handleEditClick}
            onEditFormSubmit={this.handleEditFormSubmit}
            onTimerPlay={this.handleTimerPlay}
            onTimerPause={this.handleTimerPause}
          />
          <Footer
            countTasksActive={countTasksActive}
            tasksFilterValues={tasksFilterValues}
            filterValue={filterValue}
            onFilterChange={this.handleFilterChange}
            onClearCompletedClick={this.handleClearCompletedClick}
          />
        </section>
      </section>
    );
  }
}
