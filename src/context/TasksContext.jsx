//!управление задачами
//кладем в контекст список задач, ссылки на элементы Ref, функции обработчики

import { createContext } from 'react';
import useTasks from '../hooks/useTasks';
import useIncompleteTasks from '../hooks/useIncompleteTasks';

export const TasksContext = createContext({});

export const TasksProvider = (props) => {
  const { children } = props;

  const {
    tasks,
    filteredTasks,
    deleteTask,
    deleteAllTasks,
    toggleTaskComplete,
    newTaskTitle,
    setNewTaskTitle,
    searchQuery,
    setSearchQuery,
    newTaskInputRef,
    addTask,
  } = useTasks();

  const {
    firstIncompleteTaskRef,
    firstIncompleteTaskId,
  } = useIncompleteTasks(tasks);

  return (
    <TasksContext.Provider
      value={{
        tasks,
        filteredTasks,
        deleteTask,
        deleteAllTasks,
        toggleTaskComplete,
        firstIncompleteTaskRef,
        firstIncompleteTaskId,
        newTaskTitle,
        setNewTaskTitle,
        searchQuery,
        setSearchQuery,
        newTaskInputRef,
        addTask,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};
