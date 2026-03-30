// Поле новая задача
import { TodoItem } from './TodoItem';

export const TodoList = () => {
  const hasTask = true; //заглушка вспомогательная переменная

  // если нет задач отображается todo__empty-message
  if (!hasTask) {
    return (
      <div className="todo__empty-message"></div>
    );
  }

  return (
    <ul className="todo__list">
      <TodoItem
        className="todo__item"
        id="Задача-1"
        title="купить молоко"
        isDone={false}
      />
      <TodoItem
        className="todo__item"
        id="Задача-2"
        title="Покормить кота"
        isDone
      />
    </ul>
  );
};
