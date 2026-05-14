// Общее колисество задач и кнопка удалить
// Сколько задач из скольки сделано
import { memo } from 'react'

export const TodoInfo = memo((props) => {
  console.log('TodoInfo')
  const {
    total,
    done,
    onDeleteAllButtonClick, //объявили в todo
  } = props;

  //! для кнопки если больше нуля кнопка появляется
  const hasTasks = total > 0;

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
          onClick={onDeleteAllButtonClick}
        >
          Удалить все
        </button>
      )}
    </div>
  );
});
