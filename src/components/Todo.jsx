//выводит все компоненты
import { useContext } from 'react';
import { TasksContext } from '../context/TasksContext';
import { AddTaskForm } from './AddTaskForm';
import { SearchTaskForm } from './SearchTaskForm';
import { TodoInfo } from './TodoInfo';
import { TodoList } from './TodoList';
import { Button } from './Button';

export const Todo = () => {
  const { firstIncompleteTaskRef } =
    useContext(TasksContext);
  return (
    <div className="todo">
      <h1 className="todo__title">
        Список дел, которые нужно сделать
      </h1>
      <AddTaskForm />
      <SearchTaskForm />
      <TodoInfo />
      <Button
        onClick={() =>
          firstIncompleteTaskRef.current?.scrollIntoView(
            { behavior: 'smooth' }
          )
        }
      >
        Показать первое незавершенное задание
      </Button>
      <TodoList />
    </div>
  );
};
