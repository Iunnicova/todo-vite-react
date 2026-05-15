// Поле новая задача
import { TodoItem } from './TodoItem';
import { memo } from 'react'

export const TodoList = memo((props) => {
  console.log('TodoList')
  //! делаем тодоЛист динамическим будет принимать массив задачи через пропсы и рендерить на основе этих данных
  const {
    tasks = [],
    filteredTasks,
    firstIncompleteTaskRef,
    firstIncompleteTaskId,
    onDeleteTasksButtonClick,
    onTaskCompleteChange,
  } = props;

  //!поиск
  //*Пока нет никаких заданий
  const hasTask = tasks.length > 0;
  //* Задачи не найдены
  const isEmptyFilteredTasks =
    filteredTasks?.length === 0;

  // если нет задач отображается todo__empty-message
  if (!hasTask) {
    return (
      <div className="todo__empty-message">
        Пока нет никаких заданий
      </div>
    );
  }

  //!поиск
  if (hasTask && isEmptyFilteredTasks) {
    return (
      <div className="todo__empty-message">
        Задачи не найдены
      </div>
    );
  }

  return (
    //! проходимся по массиву из Todo и возвращаем список задач
    <ul className="todo__list">
      {/* ПОИСК проверяем если filteredTasks не null то будем рендерить отфильтрованные задачи а в ином случае просто все задачи из стейт переменной tasks */}
      {(filteredTasks ?? tasks).map((task) => (
        <TodoItem
          className="todo__item"
          key={task.id} // обязательно уникальный key
          ref={
            task.id === firstIncompleteTaskId
              ? firstIncompleteTaskRef
              : null
          } //переходим к первой незавершенной задачи проверяем если id совпадает иначе передаем null
          onDeleteTasksButtonClick={
            onDeleteTasksButtonClick
          } //удаление задачи
          onTaskCompleteChange={
            onTaskCompleteChange
          } //удаление галочки
          {...task} //а можно и так не перечисляя все пропсы используем спред он разворачивает все пропсы
        />
      ))}
    </ul>
  );
});
