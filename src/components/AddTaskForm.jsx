// окно для новой задачи

import { Field } from './Field';
import { Button } from './Button';
import { useContext } from 'react';
import { TasksContext } from '@/context/TasksContext';

export const AddTaskForm = () => {
  const {
    addTask,
    newTaskInputRef, //!добавление задачи через useRef
    newTaskTitle, //useState добавление задачи
    setNewTaskTitle, //useState добавление задачи
  } = useContext(TasksContext);

  //!не нажимается кнопка новая задача пока пустое поле
  const clearNewTaskTitle = newTaskTitle.trim()
  const isNewTaskTitleEmpty = clearNewTaskTitle.length === 0

  const onSubmit = (event) => {
    event.preventDefault(); //отменяет стандартное браузерное поведение из за этого не будет перегружаться страница

    //!проверяем что поле новая задача не пустое
    if(!isNewTaskTitleEmpty) {
      addTask(clearNewTaskTitle); //для добавления новой задачи
    }
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
        ref={newTaskInputRef} //!добавление задачи через useRef
      />
      <Button
        type="submit"
        isDisabled={isNewTaskTitleEmpty}  //не нажимается кнопка новая задача пока пустое поле
      // isDisabled={newTaskTitle.trim().length === 0}  //не нажимается кнопка новая задача пока пустое поле
      >
        Добавить
      </Button>
    </form>
  );
};
