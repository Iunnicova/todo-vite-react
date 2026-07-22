// //? localApi- будет иметь тот же внешний интерфейс, что и tasks с API. Под капотом будет использовать local Storag с имитацией круда на бэкэнде
// //? + простая переключалка в деф режиме, при локальной разработке будет успешно продолжать работать JSON  сервер,
// //? а в  продакшен сборке все автоматически заменится на local Storag

const STORAGE_KEY = 'tasks';

//! read - будут читать tasks из local Storag и возвращать их, если они есть, либо отдавать пустой массив в качестве значения по умолчанию
const read = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
};

//! write - данные преобразованные через JSON.stringify
const write = (tasks) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};

//! delay - нужна для имитации задержки про общении с local Storag, как буд то бы с бэкэндом
const delay = (ms = 150) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

//внутренности скопировали из tasksAPI -index.js поправляем каждый из методов чтобы сымитировать работу с бэкэндом. добывляем чтобы пометить функцию как асинхронную. добавляем await delay()-так мы сымитируем задержку в 150 мл, словно при общении с реальным сервером(бэкэндом)

const localAPI = {
  //! выполняем запрос к серверу получение всех задач
  getAll: async () => {
    await delay();

    return read();
  },

  //! будем выполнять запрос к серверу для получения данных конкретной задачи по ее id
  getById: async (id) => {
    await delay();

    return read().find((task) => task.id === id) ?? null;
  },

  //! добавление новая задача эмитируем действие, которые JSсервер делает самостоятельно
  add: async (task) => {
    await delay();

    const newTask = {
      ...task,
      id: crypto?.randomUUID() ?? Date.now().toString(),
    };

    write([...read(), newTask]); //разворачиваем старый массив задач

    return newTask;
  },

  //!удаляем одну задачу с id
  delete: async (id) => {
    await delay();

    const tasks = read().filter((task) => task.id === id);

    write(tasks);
  },

  //!удалить все задачи
  deleteAll: async () => {
    await delay();

    write([]);
  },

  //!чекбокс задач и сколько задач выполнено из скольки
  toggleComplete: async (id, isDone) => {
    await delay();

    const tasks = read().map((task) => {
      return task.id === id ? { ...task, isDone } : task;
    });

    write(tasks);
  },
};

export default localAPI;
