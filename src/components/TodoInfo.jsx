// Общее колисество задач и кнопка удалить
// Сколько задач из скольки сделано
import { useContext, useMemo } from 'react';
import { TasksContext } from '../context/TasksContext';

export const TodoInfo = (() => {
  const {
   tasks,
   deleteAllTasks,
  } = useContext(TasksContext)

  const total = tasks.length

  //! для кнопки если больше нуля кнопка появляется
  const hasTasks = total > 0;

    //! число выполненных задач
  const done = useMemo(() => {
    return tasks.filter(({ isDone }) => isDone)
      .length;
  }, [tasks]);

  return (
    <div className="todo__info">
      <div className="todo__total-tasks">
        {/* Количество задач: 
        <span> 0</span> */}
        Сделано {done} из {total}
      </div>
      {/* Кнопку будет появлятся только если есть задачи */}
      {hasTasks && (
        <button
          className="todo__delete-all-button"
          type="button"
          onClick={deleteAllTasks}
        >
          Удалить все
        </button>
      )}
    </div>
  );
});
