import React from 'react';

import Footer from '../Footer';
import TaskList from '../TaskList';
import NewTaskForm from '../NewTaskForm';

import './TodoApp.css'

const TodoApp = () => {
  let tasks = [{
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
  }];

  
  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm />
      </header>
      <section className="main">
        <TaskList tasks={tasks} />
        <Footer />
      </section>
    </section>
  );
};

export default TodoApp;