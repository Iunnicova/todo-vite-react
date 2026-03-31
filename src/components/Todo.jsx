//выводит все компоненты

import { AddTaskForm } from './AddTaskForm';
import { SearchTaskForm } from './SearchTaskForm';
import { TodoInfo } from './TodoInfo';
import { TodoList } from './TodoList';

export const Todo = () => {
  // временный массив задач статический
  const tasks = [
    {
      id: 'Задача-1',
      title: 'Купить молоко',
      isDone: false,
    },
    {
      id: 'Задача-2',
      title: 'Покормить кошку',
      isDone: true,
    },
  ];

const deleteAllTasks = () => {
  console.log('удалить все задачи')
}

const deleteTasks = (tasksId) => {
  console.log(`удаляем задачу с id: ${tasksId}`)
}

const toggleTaskComplete = (taskId, isDone) => {
  console.log(`Задча ${taskId} ${isDone ? 'Выполнена' : 'Не выполнена'}`)
}

  return (
    <div className="todo">
      <h1 className="todo__title">
        Список дел, которые нужно сделать
      </h1>
      <AddTaskForm />
      <SearchTaskForm />
      <TodoInfo
        total={tasks.length} //всего колличество задач
        done={
          tasks.filter(({ isDone }) => isDone).length } // число выполненных задач
          onDeleteAllButtonClick={deleteAllTasks}  //кнопка удалить все
      />
      <TodoList
        tasks={tasks} //передаем дела
        onDeleteTasksButtonClick={deleteTasks}  //удаление задачи
        onTaskCompleteChange={toggleTaskComplete}  //галочка добавить убрать
      />
    </div>
  );
};
