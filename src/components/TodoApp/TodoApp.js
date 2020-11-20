import React, { Component } from 'react';

import Footer from '../Footer';
import TaskList from '../TaskList';
import NewTaskForm from '../NewTaskForm';

import './TodoApp.css'

export default class TodoApp extends Component {
  maxId = 100;

  state = {
    tasksData: [
      this.createTask('Completed task', true),
      this.createTask('Editing task'),
      this.createTask('Active task')
    ],
    tasksFilter: [
      { id: 1, value: 'All' }, 
      { id: 2, value: 'Active' }, 
      { id: 3, value: 'Completed' }
    ],
    selectedFilter: 'All'
  };

  createTask(text, completed = false) {
    return {
      id: this.maxId++,
      description: text,
      created: new Date(),
      completed: completed
    }
  }

  toggleItemProperty(arr, id, propName) {
    return arr.map(item => {
      let { id: itemId } = item;

      let result = item;
      if(itemId === id) {
        result = {
          ...item,
          [propName]: !item[propName]
        };
      }

      return result;
    });
  }

  relaceItem(arr, newItem) {
    return arr.map(item => {
      let { id: itemId } = item;

      return itemId === newItem.id
        ? newItem
        : item;
    })
  }

  addItem(arr, item) {
    return [
      ...arr,
      item
    ];
  }

  deleteItem(arr, id) {
    return arr.filter(({ id: itemId }) => {
      return itemId !== id;
    })
  }

  getTasksByFilter(tasksData, filterValue) {
    switch(filterValue) {
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

  completedItem = (id) => {
    this.setState(({ tasksData }) => {
      return {
        tasksData: this.toggleItemProperty(tasksData, id, 'completed')
      };
    });
  }

  editingItem = (id) => {
    this.setState(({ tasksData }) => {
      return {
        tasksData: this.toggleItemProperty(tasksData, id, 'editing')
      };
    });
  }

  createdItem = (text) => {
    this.setState(({ tasksData }) => {
      let newItem = this.createTask(text);

      return {
        tasksData: this.addItem(tasksData, newItem)
      }
    });
  }

  editedItem = (oldItem, text) => {
    this.setState(({ tasksData }) => {
      let newItem = {
        ...oldItem,
        description: text,
        editing: false
      };

      return {
        tasksData: this.relaceItem(tasksData, newItem)
      }
    });
  }

  deletedItem = (id) => {
    this.setState(({ tasksData }) => {
      return {
        tasksData: this.deleteItem(tasksData, id)
      };
    });
  }

  selectedFilter = (value) => {
    this.setState({
      selectedFilter: value
    });
  }

  clearCompleted = () => {
    this.setState(({ tasksData }) => {
      return {
        tasksData: tasksData.filter(({ completed }) => !completed)
      };
    })
  }


  render() {
    let { tasksData, tasksFilter, selectedFilter } = this.state;

    let filteredTasksData = this.getTasksByFilter(tasksData, selectedFilter);
    let countTasksActive = this.getTasksByFilter(tasksData, 'Active').length;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm 
            onSubmit={ this.createdItem } />
        </header>
        <section className="main">
          <TaskList tasks={filteredTasksData} 
            onDeleted={ this.deletedItem }
            onCompleted={ this.completedItem }
            onEditing={ this.editingItem }
            onEdited={ this.editedItem } />
          <Footer
            countTasksActive={ countTasksActive }
            tasksFilter={ tasksFilter }
            onSelectedFilter={ this.selectedFilter }
            filterDefault={ selectedFilter }
            onClearCompleted={ this.clearCompleted } />
        </section>
      </section>
    );
  }
}