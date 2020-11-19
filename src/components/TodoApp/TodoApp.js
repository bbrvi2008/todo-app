import React, { Component } from 'react';

import Footer from '../Footer';
import TaskList from '../TaskList';
import NewTaskForm from '../NewTaskForm';

import './TodoApp.css'

export default class TodoApp extends Component {
  state = {
    tasksData: [{
      id: 1,
      description: 'Completed task',
      created: new Date("2020-11-18T16:00:06.926Z"),
      completed: true
    }, {
      id: 2,
      description: 'Editing task',
      created: new Date("2020-11-18T15:55:06.926Z"),
      completed: false,
      editing: true
    }, {
      id: 3,
      description: 'Active task',
      created: new Date("2020-11-18T15:55:06.926Z"),
      completed: false
    }]
  };

  completedItem = (id) => {
    console.log('complete', id);



    this.setState(({ tasksData }) => {
      let idx = tasksData.findIndex(item => item.id === id);

      let editableTask = tasksData[idx];
      let newTask = {
        ...editableTask,
        completed: !editableTask.completed
      };

      console.log(newTask);

      return {
        tasksData: [
          ...tasksData.slice(0, idx),
          newTask,
          ...tasksData.slice(idx + 1)
        ]
      };
    });
  }

  deletedItem = (id) => {
    console.log('delete', id);

    this.setState(({ tasksData }) => {
      let idx = tasksData.findIndex(item => item.id === id);

      return {
        tasksData: [
          ...tasksData.slice(0, idx),
          ...tasksData.slice(idx + 1)
        ]
      };
    });

  }

  render() {
    let { tasksData } = this.state;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm />
        </header>
        <section className="main">
          <TaskList tasks={tasksData} 
            onDeleted={ this.deletedItem } 
            onCompleted={ this.completedItem } />
          <Footer />
        </section>
      </section>
    );
  }
}