// Форма поиска заданий

import { Field } from './Field';

export const SearchTaskForm = () => {
  return (
    <form className="todo__form">
      <Field
        className="todo__field"
        label="Поиск задачи"
        id="search-task"
        type="search"
      />
    </form>
  );
};
