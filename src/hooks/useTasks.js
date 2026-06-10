import {
  useState,
  useCallback,
  useRef,
  useEffect,
  useMemo,
} from 'react';


const useTasks = () => {
  const [tasks, setTasks] = useState([]);

  //добавляем задачи в список
  const [newTaskTitle, setNewTaskTitle] =
    useState('');

  //!Поиск задач
  const [searchQuery, setSearchQuery] =
    useState('');

  //!вызываем метод FOCUS чтобы отловить момент загрузки страницы
  // получаем через useRef доступ к дом элементу input
  const newTaskInputRef = useRef(null);

  //!удалить все задачи
  // **оборачиваем в useCallback что бы кнопка не пересоздавалась каждый раз заново**
  const deleteAllTasks = useCallback(() => {
    // console.log('удалить все задачи')

    //спрашиваем действительно ли пользователь хочет удалить все задачи разом
    const isConfirmed = confirm(
      'Вы уверены, что хотите удалить все?'
    );

    //если пользователь подтвердит что хочет удалить все задачи то..
    if (isConfirmed) {
      Promise.all(
        tasks.map(({ id }) => {
          return fetch(`http://localhost:3001/tasks/${id}`, {
            method: 'DELETE'
          })
        })
      ).then(() => setTasks([]))
    }
  }, [tasks]);

  //!удаляем одну задачу с id
  const deleteTask = useCallback((taskId) => {
    fetch(`http://localhost:3001/tasks/${taskId}`, {
      method: 'DELETE'
    })
      .then(() => {
        setTasks(
          tasks.filter((task) => task.id !== taskId)
        )
      })
  }, [tasks]);

  //!чекбокс задач и сколько задач выполнено из скольки
  const toggleTaskComplete = useCallback(
    (taskId, isDone) => {
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
    },
    [tasks]
  );

  //! добавление новая задача и добавлялась при нажатии на ENTER
  const addTask = useCallback((title) => {
    const newTask = {
      title,
      isDone: false,
    };

    fetch('http://localhost:3001/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask),
    })
      .then((response) => response.json())                  //преобразуем ответ сервера в нужный нам формат
      .then((addedTasks) => {
        //* добавляем к старым задачам новую
        setTasks((prevTasks) => [...prevTasks, addedTasks]);  // колбек дает доступ к актуальному на момент срабатывания setTasks состоянию, prevTasks-предыдущее состояние
        setNewTaskTitle('');                                // Очищаем поле ввода
        setSearchQuery('');                                 //сброс поля поиска. если в поле поиска написан текст и пользователь переключился на ввод новой задачи после добавления новая задача добавится
        newTaskInputRef.current.focus();                    //FOCUS при заполнении поля
      })
  }, []);

  //! выполняем запрос к серверу 
  useEffect(() => {
    newTaskInputRef.current.focus();              //FOCUS при заполнении задач 

    fetch('http://localhost:3001/tasks')
      .then((response) => response.json())       //преобразуем ответ сервера в нужный нам формат
      .then(setTasks)                            // во второй приходят данные в обработанном виде
  }, []);

  //!поиск
  //фильтруем если clearSearchQuery длина введенного значения больше 0 в таком случае обращаемся к tasks вызываем метод фильтер и в колбеке будет простая проверка структуируем заголовок задачи title возвращаем результат проверки, получим только те задачи у которых в title входит наш поисковый запрос без учета регистра второй строкой пишем null что бы когда длина чистого поискового запроса 0 символов в filteredTasks все обнулялось. Если поиск не активен (если в поле поиска пусто или только пробелы то в filteredTasks )
  //* useMemo запоминает результат вычислений пока входные данные не изменились, стабилизация вычисляемых данных
  const filteredTasks = useMemo(() => {
    const clearSearchQuery = searchQuery
      .trim()
      .toLowerCase(); //trim() обрезаем с обеех сторон с пробелов приводим к нижнему регистру
    return clearSearchQuery.length > 0
      ? tasks.filter(({ title }) =>
        title
          .toLowerCase()
          .includes(clearSearchQuery)
      )
      : null;
  }, [searchQuery, tasks]); //данные от которых зависят внутренние вычисления

  //! число выполненных задач(перенесли в TodoInfo переименовали в done)
  // const doneTasks = useMemo(() => {
  //   return tasks.filter(({ isDone }) => isDone)
  //     .length;
  // }, [tasks]);

  return {
    tasks,
    filteredTasks,
    deleteTask,
    deleteAllTasks,
    toggleTaskComplete,
    newTaskTitle,
    setNewTaskTitle,
    searchQuery,
    setSearchQuery,
    newTaskInputRef,
    addTask,
  };
};

export default useTasks;
