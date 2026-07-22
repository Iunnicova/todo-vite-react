import tasksAPI from '@/shared/api/tasks';
import {
  useState,
  useCallback,
  useRef,
  useEffect,
  useMemo,
  useReducer,
} from 'react';

const tasksReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ALL': {
      return Array.isArray(action.tasks) ? action.tasks : state;
    }
    case 'ADD': {
      return [...state, action.task];
    }
    case 'TOGGLE_COMPLETE': {
      const { id, isDone } = action;
      return state.map((task) => {
        return task.id === id ? { ...task, isDone } : task;
      });
    }
    case 'DELETE': {
      return state.filter((task) => task.id !== action.id);
    }
    case 'DELETE_ALL': {
      return [];
    }
    default: {
      return state;
    }
  }
};

const useTasks = () => {
  const [tasks, dispatch] = useReducer(tasksReducer, []);

  //!Поиск задач
  const [searchQuery, setSearchQuery] = useState('');

  //! стейт для id анимация исчезающей задачи
  const [disappearingTaskId, setDisappearingTaskId] = useState(null);

  //! анимация добавления задачи
  const [appearingTaskId, setAppearingTaskId] = useState(null);

  //!вызываем метод FOCUS чтобы отловить момент загрузки страницы
  // получаем через useRef доступ к дом элементу input
  const newTaskInputRef = useRef(null);

  //!удалить все задачи
  // **оборачиваем в useCallback что бы кнопка не пересоздавалась каждый раз заново**
  const deleteAllTasks = useCallback(() => {
    const isConfirmed = confirm('Вы уверены, что хотите удалить все?');

    //если пользователь подтвердит что хочет удалить все задачи то..
    if (isConfirmed) {
      tasksAPI.deleteAll(tasks).then(() => dispatch({ type: 'DELETE_ALL' })); // из tasksAPI
    }
  }, [tasks]);

  //!удаляем одну задачу с id задача плавно уходит наверх и становится прозрачной а нижнии элементы подтягиваются на верх
  const deleteTask = useCallback((taskId) => {
    tasksAPI.delete(taskId).then(() => {
      setDisappearingTaskId(taskId);
      setTimeout(() => {
        dispatch({ type: 'DELETE', id: taskId });

        setDisappearingTaskId(null); //что бы сбросить id удаляемой задачи
      }, 400);
    });
  }, []);

  //!чекбокс задач и сколько задач выполнено из скольки
  const toggleTaskComplete = useCallback((taskId, isDone) => {
    tasksAPI.toggleComplete(taskId, isDone).then(() => {
      dispatch({ type: 'TOGGLE_COMPLETE', id: taskId, isDone });
    });
  }, []);

  //! добавление новая задача и добавлялась при нажатии на ENTER
  const addTask = useCallback((title, callbackAfterAdding) => {
    const newTask = {
      title,
      isDone: false,
    };

    tasksAPI.add(newTask).then((addedTask) => {
      //* добавляем к старым задачам новую
      dispatch({ type: 'ADD', task: addedTask }); // колбек дает доступ к актуальному на момент срабатывания setTasks состоянию, prevTasks-предыдущее состояние
      callbackAfterAdding();
      setSearchQuery(''); //сброс поля поиска. если в поле поиска написан текст и пользователь переключился на ввод новой задачи после добавления новая задача добавится
      newTaskInputRef.current.focus(); //FOCUS при заполнении поля
      setAppearingTaskId(addedTask.id); //анимация добавления задачи
      setTimeout(() => {
        setAppearingTaskId(null);
      }, 400);
    });
  }, []);

  //! выполняем запрос к серверу получение всех задач
  useEffect(() => {
    newTaskInputRef.current.focus(); //FOCUS при заполнении задач

    tasksAPI.getAll().then((serverTasks) => {
      dispatch({ type: 'SET_ALL', tasks: serverTasks });
    });
  }, []);

  //!поиск
  //фильтруем если clearSearchQuery длина введенного значения больше 0 в таком случае обращаемся к tasks вызываем метод фильтер и в колбеке будет простая проверка структуируем заголовок задачи title возвращаем результат проверки, получим только те задачи у которых в title входит наш поисковый запрос без учета регистра второй строкой пишем null что бы когда длина чистого поискового запроса 0 символов в filteredTasks все обнулялось. Если поиск не активен (если в поле поиска пусто или только пробелы то в filteredTasks )
  //* useMemo запоминает результат вычислений пока входные данные не изменились, стабилизация вычисляемых данных
  const filteredTasks = useMemo(() => {
    const clearSearchQuery = searchQuery.trim().toLowerCase(); //trim() обрезаем с обеех сторон с пробелов приводим к нижнему регистру
    return clearSearchQuery.length > 0
      ? tasks.filter(({ title }) =>
          title.toLowerCase().includes(clearSearchQuery)
        )
      : null;
  }, [searchQuery, tasks]); //данные от которых зависят внутренние вычисления

  return {
    tasks,
    filteredTasks,
    deleteTask,
    deleteAllTasks,
    toggleTaskComplete,
    searchQuery,
    setSearchQuery,
    newTaskInputRef,
    addTask,
    disappearingTaskId,
    appearingTaskId,
  };
};

export default useTasks;
