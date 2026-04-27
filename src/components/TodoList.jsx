// Поле новая задача
import { TodoItem } from './TodoItem';

export const TodoList = (props) => {
  //! делаем тодоЛист динамическим будет принимать массив задачи через пропсы и рендерить на основе этих данных
  const {
    tasks = [],
    filteredTasks,
    onDeleteTasksButtonClick,
    onTaskCompleteChange,
  } = props;

  const hasTask = true; //заглушка вспомогательная переменная

  // если нет задач отображается todo__empty-message
  if (!hasTask) {
    return (
      <div className="todo__empty-message"></div>
    );
  }

  return (
    //! проходимся по массиву из Todo и возвращаем список задач
    <ul className="todo__list">
      {/* ПОИСК проверяем если filteredTasks не null то будем рендерить отфильтрованные задачи а в ином случае просто все задачи из стейт переменной tasks */}
      {(filteredTasks ?? tasks).map((task) => (
        <TodoItem
          className="todo__item"
          // id={task.id}
          // title={task.title}
          // isDone={task.isDone}
          key={task.id} // обязательно уникальный key
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
};
