// Поле новая задача
import TodoItem from '../TodoItem/TodoItem';
import { useContext } from 'react';
import { TasksContext } from '../../context/TasksContext';

const TodoList = (props) => {
  const { styles } = props;
  const { tasks, filteredTasks } = useContext(TasksContext);

  //!поиск
  //*Пока нет никаких заданий
  const hasTask = tasks.length > 0;
  //* Задачи не найдены
  const isEmptyFilteredTasks = filteredTasks?.length === 0;

  // если нет задач отображается emptyMessage
  if (!hasTask) {
    return <div className={styles.emptyMessage}>Пока нет никаких заданий</div>;
  }

  //!поиск
  if (hasTask && isEmptyFilteredTasks) {
    return <div className={styles.emptyMessage}>Задачи не найдены</div>;
  }

  return (
    //! проходимся по массиву из Todo и возвращаем список задач
    <ul className={styles.list}>
      {/* ПОИСК проверяем если filteredTasks не null то будем рендерить отфильтрованные задачи а в ином случае просто все задачи из стейт переменной tasks */}
      {(filteredTasks ?? tasks).map((task) => (
        <TodoItem
          className={styles.item}
          key={task.id} // обязательно уникальный key
          {...task} //а можно и так не перечисляя все пропсы используем спред он разворачивает все пропсы
        />
      ))}
    </ul>
  );
};

export default TodoList;
