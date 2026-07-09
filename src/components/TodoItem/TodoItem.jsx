// Поле задач
import { useContext, useRef } from 'react';
import useCombinedRefs from '../../hooks/useCombinedRefs';
import RouterLink from '../RouterLink/RouterLink';
import { TasksContext } from '@/context/TasksContext';

import styles from './TodoItem.module.scss';

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

  //!анимация плавная для задач
  const animationRef = useRef(null);
  const combinedRef = useCombinedRefs(
    id === firstIncompleteTaskId ? firstIncompleteTaskRef : null,
    animationRef
  )

  //! удаляемая задача плавно уходит наверх и становится прозрачной а нижнии элементы подтягиваются на верх 
  ///*обработчик обращаемся к animationRef и его свойству current через оператор функциональной последовательности убеждаемся что хранится не налл а ссылка на нужный домэлемент затем через метод  .classList.add  добавляем класс со стилями (styles.isDisappearing) позже вызываем setTimeout с задержкой 400 миллисекунды функцию  deleteTask(id)
const handleClick = () => {
animationRef.current?.classList.add(styles.isDisappearing)

setTimeout(() => {
  deleteTask(id)
}, 400)
}

  return (
    <li
      className={`${styles.todoItem} ${className}`}
      ref={combinedRef}>
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
      <label
        className={`${styles.label} visually-hidden`}
        htmlFor={id}
      >
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
        // onClick={() => deleteTask(id)}
        onClick={handleClick}
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
