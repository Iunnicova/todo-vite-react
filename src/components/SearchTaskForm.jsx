// Форма поиска заданий

import { useContext } from 'react';
import { Field } from './Field';
import { TasksContext } from '@/context/TasksContext';

export const SearchTaskForm = () => {
  const {
    // onSearchInput
    searchQuery,
    setSearchQuery,
  } = useContext(TasksContext);

  return (
    <form
      className="todo__form"
      onSubmit={(event) => event.preventDefault()} //при нажатии ENTER страница не перезагружается
    >
      <Field
        className="todo__field"
        label="Поиск задачи"
        id="search-task"
        type="search"
        value={searchQuery}
        // onInput={(event) =>
        //   onSearchInput(event.target.value)
        onInput={(event) =>
          setSearchQuery(event.target.value)
        }
      />
    </form>
  );
};
