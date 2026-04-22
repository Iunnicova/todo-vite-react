// окно для новой задачи

import { Field } from './Field';
import { Button } from './Button';

export const AddTaskForm = (props) => {
  const {
    addTask,
    newTaskTitle, //useState добавление задачи
    setNewTaskTitle, //useState добавление задачи
  } = props;

  const onSubmit = (event) => {
    event.preventDefault(); //отменяет стандартное браузерное поведение из за этого не будет перегружаться страница
    addTask(); //для добавления новой задачи
  };

  return (
    <form
      className="todo__form"
      onSubmit={onSubmit}
    >
      <Field
        className="todo__field"
        label="Новая задача"
        id="new-task"
        value={newTaskTitle} //useState добавление задачи
        onInput={(event) =>
          setNewTaskTitle(event.target.value)
        } //useState добавление задачи
      />
      <Button type="submit">Добавить</Button>
    </form>
  );
};
