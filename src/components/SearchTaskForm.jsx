// Форма поиска заданий

import { Field } from './Field';

export const SearchTaskForm = (props) => {
  const {
    // onSearchInput
    searchQuery,
    setSearchQuery,
  } = props;

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
