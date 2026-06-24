// Форма поиска заданий

import { useContext } from 'react';
import { Field } from '../Field/Field';
import { TasksContext } from '../../context/TasksContext';

export const SearchTaskForm = (props) => {
  const { styles } = props;
  const {
    // onSearchInput
    searchQuery,
    setSearchQuery,
  } = useContext(TasksContext);

  return (
    <form
      className={styles.form}
      onSubmit={(event) => event.preventDefault()} //при нажатии ENTER страница не перезагружается
    >
      <Field
        className={styles.field}
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
