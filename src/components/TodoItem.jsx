// Поле задач
import { useContext } from 'react';
import { TasksContext } from '../context/TasksContext';

export const TodoItem = (props) => {
  const {
    className = '',
    id,
    title,
    isDone, //флаг выполнена задача или нет
  } = props;

  const {
    firstIncompleteTaskRef,
    firstIncompleteTaskId,
    deleteTask,
    toggleTaskComplete,
  } = useContext(TasksContext);

  return (
    //ref={ref} переходим к первой незавершенной задачи
    <li
      className={`todo-item ${className}`}
      ref={
        id === firstIncompleteTaskId
          ? firstIncompleteTaskRef
          : null
      }
    >
      {' '}
      <input
        className="todo-item__checkbox"
        id={id}
        type="checkbox"
        checked={isDone}
        // readOnly //нельзя изменить текст в input
        onChange={({ target }) => {
          toggleTaskComplete(id, target.checked);
        }} //добавление удаление галочки
      />
      <label
        className="todo-item__label visually-hidden"   //visually-hidden утилитарный класс в styles/utils.css визуально скрывает элемент , визуально скроится но останется видимым для сканридера
        htmlFor={id}
      >
        {/* Задача 1 */}
        {title}
      </label>
      {/* aria-label='Task detail page/Страница сведений о задаче' */}
      <a href={`/tasks/${id}`} aria-label='Task detail page/Страница сведений о задаче'> 
        {title}
      </a>
      <button
        className="todo-item__delete-button"
        aria-label="Delete"
        title="Delete"
        onClick={() => deleteTask(id)}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 5L5 15M5 5L15 15"
            stroke="#757575"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </li>
  );
};
