// окно для новой задачи

import { Field } from './Field';
import { Button } from './Button';

export const AddTaskForm = () => {
  return (
    <form className="todo__form">
      <Field
        className="todo__field"
        label="Новая задача"
        id="new-task"
      />
      <Button tupe="submit">Добавить</Button>
    </form>
  );
};
