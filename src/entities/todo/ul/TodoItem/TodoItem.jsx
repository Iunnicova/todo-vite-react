// Поле задач
import { useContext } from 'react';
import RouterLink from '@/shared/components/RouterLink';
import { TasksContext } from '@/entities/todo';

import styles from './TodoItem.module.scss';

const TodoItem = (props) => {
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
    disappearingTaskId,
    appearingTaskId,
  } = useContext(TasksContext);

  return (
    //! добавление и удаляемая задача плавно уходит наверх и становится прозрачной а нижнии элементы подтягиваются на верх
    <li
      className={`
        ${styles.todoItem} 
        ${className} 
        ${disappearingTaskId === id ? styles.isDisappearing : ''} //!анимации удаления задачи добавляем стили из isDisappearing для 
        ${appearingTaskId === id ? styles.isAppearing : ''} //! анимации добавления задачи добавляем стили из isDisappearing для 
        `}
      ref={id === firstIncompleteTaskId ? firstIncompleteTaskRef : null}
    >
      {' '}
      <input
        className={styles.checkbox}
        id={id}
        type="checkbox"
        checked={isDone}
        // readOnly //нельзя изменить текст в input
        onChange={({ target }) => {
          toggleTaskComplete(id, target.checked);
        }} //добавление удаление галочки
      />
      <label className={`${styles.label} visually-hidden`} htmlFor={id}>
        {title}
      </label>
      <RouterLink
        to={`/tasks/${id}`}
        aria-label="Task detail page/Страница сведений о задаче"
      >
        {title}
      </RouterLink>
      <button
        className={styles.deleteButton}
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

export default TodoItem;
