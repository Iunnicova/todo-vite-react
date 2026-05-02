//выводит все компоненты
import {
  useState,
  useEffect,
  useRef,
} from 'react';
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

  //добавляем задачи через useRef
  const newTaskInputRef = useRef(null);

  //!Поиск задач
  const [searchQuery, setSearchQuery] =
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
  // const filterTasks = (query) => {
  //   console.log(`Поиск: ${query}`);
  // };

  // * новая задача и добавлялась при нажатии на ENTER
  // console.log('Задача добавлена')
  //   .trim() отрезает все пробелы в начале и в конце строки, что точно ввели текст
  //   length > 0 - Если длина больше 0, значит, там есть хотя бы одна буква или цифра. Значит, задача настоящая!
  // * crypto?.randomUUID()-генерирует супернадежный id
  // Это современный стандарт. Функция генерирует очень длинную, случайную и уникальную строку (например, 123e4567-e89b-12d3-a456-426614174000).Вероятность дубля: Практически нулевая.
  // *    ?
  //  (Optional Chaining): Это проверка. Если вдруг браузер старый и не знает, что такое crypto, код не выдаст ошибку, а просто вернет undefined и пойдет дальше.
  // *  Date.now().toString()
  // Если crypto не сработал, мы берем способ который работает во всех браузерах

  //добавление задачи через useState
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
      //сброс поля поиска. если в поле поиска написан текст и пользователь переключился на ввод новой задачи после добавления новая задача добавится
      setSearchQuery('');
    }
  };

  //!добавление задачи через useRef
  // const addTask = () => {
  //   const newTaskTitle = newTaskInputRef.current.value
  //      if (newTaskTitle.trim().length > 0) {
  //     const newTask = {
  //       id:
  //         crypto?.randomUUID() ??
  //         Date.now().toString(),
  //       title: newTaskTitle,
  //       isDone: false,
  //     };

  //     // добавляем к старым задачам новую
  //     setTasks([...tasks, newTask]);
  //     // Очищаем поле ввода
  //     newTaskInputRef.current.value = ''
  //     // setNewTaskTitle('');
  //     //сброс поля поиска. если в поле поиска написан текст и пользователь переключился на ввод новой задачи после добавления новая задача добавится
  //     setSearchQuery('')
  //   }
  // };

  //что бы при перезагрузки страницы задачи были на месте
  useEffect(() => {
    // console.log(' сохраняем данные в хранилище изменился tasks', tasks)
    localStorage.setItem(
      'tasks',
      JSON.stringify(tasks)
    ); //срабатывает каждый раз когда список задач меняется
  }, [tasks]); //что бы следить за изменением нужного состояния

  //!поиск
  //trim() обрезаем с обеех сторон с пробелов приводим к нижнему регистру
  const clearSearchQuery = searchQuery
    .trim()
    .toLowerCase();

  //фильтруем если clearSearchQuery длина введенного значения больше 0 в таком случае обращаемся к tasks вызываем метод фильтер и в колбеке будет простая проверка структуируем заголовок задачи title возвращаем результат проверки, получим только те задачи у которых в title входит наш поисковый запрос без учета регистра второй строкой пишем null что бы когда длина чистого поискового запроса 0 символов в filteredTasks все обнулялось. Если поиск не активен (если в поле поиска пусто или только пробелы то в filteredTasks )
  const filteredTasks =
    clearSearchQuery.length > 0
      ? tasks.filter(({ title }) =>
          title
            .toLowerCase()
            .includes(clearSearchQuery)
        )
      : null;

  return (
    <div className="todo">
      <h1 className="todo__title">
        Список дел, которые нужно сделать
      </h1>
      <AddTaskForm
        addTask={addTask}
        newTaskTitle={newTaskTitle} //useState добавление задачи
        setNewTaskTitle={setNewTaskTitle} //useState перезаписываем добавление задачи
        newTaskInputRef={newTaskInputRef} //добавление задачи через useRef
      />
      <SearchTaskForm
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        // onSearchInput={filterTasks}
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
        filteredTasks={filteredTasks} // поиск
        onDeleteTasksButtonClick={deleteTasks} //удаление задачи
        onTaskCompleteChange={toggleTaskComplete} //галочка добавить убрать
      />
    </div>
  );
};
