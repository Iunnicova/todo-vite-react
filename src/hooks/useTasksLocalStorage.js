//логика работы с LocalStorage(хранение данных при перезагрузки задачи сохраняются)
// если в дальнейшем будем использовать сервер логику меняем только здесь и все будет работать

const useTasksLocalStorage = () => {
  const savedTasks = localStorage.getItem('tasks');

  const saveTasks = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks)); //срабатывает каждый раз когда список задач меняется
  };

  return {
    savedTasks: savedTasks ? JSON.parse(savedTasks) : null, //проверяем если в savedTasks что то есть то будем парсить сущность иначе возвращаем null
    saveTasks,
  };
};

export default useTasksLocalStorage;
