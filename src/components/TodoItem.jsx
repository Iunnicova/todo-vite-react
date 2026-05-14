// Поле задач
export const TodoItem = (props) => {
  console.log('TodoItem')
  const {
    className = '',
    id,
    title,
    isDone, //флаг выполнена задача или нет
    ref, //переходим к первой незавершенной задачи
    onDeleteTasksButtonClick, //удаление задачи
    onTaskCompleteChange, //добавление удаление галочки
  } = props;

  return (
    //ref={ref} переходим к первой незавершенной задачи
    <li
      className={`todo-item ${className}`}
      ref={ref}
    >
      {' '}
      /
      <input
        className="todo-item__checkbox"
        id={id}
        type="checkbox"
        checked={isDone}
        // readOnly //нельзя изменить текст в input
        onChange={({ target }) => {
          onTaskCompleteChange(
            id,
            target.checked
          );
        }} //добавление удаление галочки
      />
      <label
        className="todo-item__label"
        htmlFor={id}
      >
        {/* Задача 1 */}
        {title}
      </label>
      <button
        className="todo-item__delete-button"
        aria-label="Delete"
        title="Delete"
        onClick={() =>
          onDeleteTasksButtonClick(id)
        }
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
