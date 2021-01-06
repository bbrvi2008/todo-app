import React, { useState } from 'react';

import Footer from '../Footer';
import TaskList from '../TaskList';
import { NewTaskForm } from '../TaskForm';

import './TodoApp.css';

const TodoApp = () => {
  const getUniqueId = () =>  {
    let maxId = 100;

    return () => {
      maxId += 1;
      return maxId;
    };
  }

  const getTasksByFilter = (tasksData, filterValue) => {
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

  const toggleItemProperty = (arr, id, propName) => arr.map((item) => {
    const { id: itemId } = item;

    let result = item;
    if (itemId === id) {
      result = {
        ...item,
        [propName]: !item[propName],
      };
    }

    return result;
  })

  const updateItemProperties = (arr, id, props) => arr.map((item) => {
    const { id: itemId } = item;

    let result = item;
    if (itemId === id) {
      result = {
        ...item,
        ...props,
      };
    }

    return result;
  })

  const relaceItem = (arr, newItem) => arr.map((item) => {
    const { id: itemId } = item;

    return itemId === newItem.id ? newItem : item;
  })

  const addItem = (arr, item) => [...arr, item]

  const deleteItem = (arr, id) => arr.filter(({ id: itemId }) => {
    return itemId !== id;
  })

  const createTask = (text, completed = false) => ({
    id: getUniqueId(),
    description: text,
    created: new Date(),
    completed,
    timer: 0,
    startTimer: null,
    editing: false
  })

  const [ tasksData, setTasksData ] = useState([
    createTask('Completed task', true),
    createTask('Editing task'),
    createTask('Active task'),
  ]);
  const [ filterValue, setFilterValue ] = useState('All')

  const handleNewFormSubmit = (text) => {
    const newItem = createTask(text);
    
    setTasksData(tasks => addItem(tasks, newItem));
  };

  const handleEditFormSubmit = (oldItem, text) => {
    const newItem = {
      ...oldItem,
      description: text,
      editing: false,
    };

    setTasksData(tasks => relaceItem(tasks, newItem));
  };

  const handleCompleteClick = (id) => {
    setTasksData(tasks => toggleItemProperty(tasks, id, 'completed'));
  };

  const handleEditClick = (id) => {
    setTasksData(tasks => toggleItemProperty(tasks, id, 'editing'));
  };

  const handleDeleteClick = (id) => {
    setTasksData(tasks => deleteItem(tasks, id))
  };

  const handleTimerPause = (id, timer) => {
    setTasksData(tasks => updateItemProperties(tasks, id, {
      timer,
      startTimer: null
    }));
  }

  const handleTimerPlay = (id) => {
    setTasksData(tasks => updateItemProperties(tasks, id, {
      startTimer: new Date()
    }));
  }

  const handleFilterChange = (value) => {
    setFilterValue(value);
  };

  const handleClearCompletedClick = () => {
    setTasksData(tasks => tasks.filter(({ completed }) => !completed));
  };

  const tasksFilterValues = [
    { id: 1, value: 'All' },
    { id: 2, value: 'Active' },
    { id: 3, value: 'Completed' },
  ];
  const filteredTasksData = getTasksByFilter(tasksData, filterValue);
  const countTasksActive = getTasksByFilter(tasksData, 'Active').length;

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm onSubmit={handleNewFormSubmit} />
      </header>
      <section className="main">
        <TaskList
          tasks={filteredTasksData}
          onDeleteClick={handleDeleteClick}
          onCompleteClick={handleCompleteClick}
          onEditClick={handleEditClick}
          onEditFormSubmit={handleEditFormSubmit}
          onTimerPlay={handleTimerPlay}
          onTimerPause={handleTimerPause}
        />
        <Footer
          countTasksActive={countTasksActive}
          tasksFilterValues={tasksFilterValues}
          filterValue={filterValue}
          onFilterChange={handleFilterChange}
          onClearCompletedClick={handleClearCompletedClick}
        />
      </section>
    </section>
  );
}

export default TodoApp;
