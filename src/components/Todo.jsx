//выводит все компоненты
import { useState, useEffect } from 'react';
import { AddTaskForm } from './AddTaskForm';
import { SearchTaskForm } from './SearchTaskForm';
import { TodoInfo } from './TodoInfo';
import { TodoList } from './TodoList';

export const Todo = () => {
  //обновляем список задач
  // const [tasks, setTasks] = useState([
  //   {
  //     id: 'Задача-1',
  //     title: 'Купить молоко',
  //     isDone: false,
  //   },
  //   {
  //     id: 'Задача-2',
  //     title: 'Покормить кошку',
  //     isDone: true,
  //   },
  // ]);
  const [tasks, setTasks] = useState(() => {
    const savedTasks =
      localStorage.getItem('tasks');
    if (savedTasks) {
      return JSON.parse(savedTasks);
    }

    return [
      {
        id: 'Задача-1',
        title: 'Купить молоко',
        isDone: false,
      },
      {
        id: 'Задача-2',
        title: 'Покормить кошку',
        isDone: true,
      },
    ];
  });

  //добавляем задачи в список
  const [newTaskTitle, setNewTaskTitle] =
    useState('');

  //!удалить все задачи
  const deleteAllTasks = () => {
    // console.log('удалить все задачи')

    //спрашиваем действительно ли пользователь хочет удалить все задачи разом
    const isConfirmed = confirm(
      'Вы уверены, что хотите удалить все?'
    );

    //если пользователь подтвердит что хочет удалить все задачи то..
    if (isConfirmed) {
      setTasks([]);
    }
  };

  //!удаляем одну задачу с id
  const deleteTasks = (taskId) => {
    // console.log(
    //   `удаляем задачу с id: ${tasksId}`
    // );
    setTasks(
      tasks.filter((task) => task.id !== taskId)
    );
  };

  //!чекбокс задач и сколько задач выполнено из скольки
  const toggleTaskComplete = (taskId, isDone) => {
    // console.log(
    //   `Задача ${taskId} ${isDone ? 'Выполнена' : 'Не выполнена'}`
    // );

    //* перебираем массив с помощью map
    setTasks(
      tasks.map((task) => {
        //* если id совпадает с переданным возвращаем новый объект задач в котором изменяем только поле is Dane
        if (task.id === taskId) {
          return { ...task, isDone };
        }
        //* для всех остальных задач возвращает их без изменений
        return task;
      })
    );
  };

  //поле поиска
  const filterTasks = (query) => {
    console.log(`Поиск: ${query}`);
  };

  // ! новая задача и добавлялась при нажатии на ENTER
  // console.log('Задача добавлена')
  //   .trim() отрезает все пробелы в начале и в конце строки, что точно ввели текст
  //   length > 0 - Если длина больше 0, значит, там есть хотя бы одна буква или цифра. Значит, задача настоящая!
  // ! crypto?.randomUUID()-генерирует супернадежный id
  // Это современный стандарт. Функция генерирует очень длинную, случайную и уникальную строку (например, 123e4567-e89b-12d3-a456-426614174000).Вероятность дубля: Практически нулевая.
  // !    ?
  //  (Optional Chaining): Это проверка. Если вдруг браузер старый и не знает, что такое crypto, код не выдаст ошибку, а просто вернет undefined и пойдет дальше.
  // !  Date.now().toString()
  // Если crypto не сработал, мы берем способ который работает во всех браузерах

  const addTask = () => {
    if (newTaskTitle.trim().length > 0) {
      const newTask = {
        id:
          crypto?.randomUUID() ??
          Date.now().toString(),
        title: newTaskTitle,
        isDone: false,
      };

      // добавляем к старым задачам новую
      setTasks([...tasks, newTask]);

      // Очищаем поле ввода
      setNewTaskTitle('');
    }
  };

  //что бы при перезагрузки страницы задачи были на месте
  useEffect(() => {
    // console.log(' сохраняем данные в хранилище изменился tasks', tasks)
    localStorage.setItem(
      'tasks',
      JSON.stringify(tasks)
    ); //срабатывает каждый раз когда список задач меняется
  }, [tasks]); //что бы следить за изменением нужного состояния

  return (
    <div className="todo">
      <h1 className="todo__title">
        Список дел, которые нужно сделать
      </h1>
      <AddTaskForm
        addTask={addTask}
        newTaskTitle={newTaskTitle} //useState добавление задачи
        setNewTaskTitle={setNewTaskTitle} //useState перезаписываем добавление задачи
      />
      <SearchTaskForm
        onSearchInput={filterTasks}
      />
      <TodoInfo
        total={tasks.length} //всего колличество задач
        done={
          tasks.filter(({ isDone }) => isDone)
            .length
        } // число выполненных задач
        onDeleteAllButtonClick={deleteAllTasks} //кнопка удалить все
      />
      <TodoList
        tasks={tasks} //передаем дела
        onDeleteTasksButtonClick={deleteTasks} //удаление задачи
        onTaskCompleteChange={toggleTaskComplete} //галочка добавить убрать
      />
    </div>
  );
};
