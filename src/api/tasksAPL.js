//! Запросы useTasks

const URL = 'http://localhost:3001/tasks';

const headers = {
  'Content-Type': 'application/json',
};

//*методы объектов
const tasksAPI = {
  //! выполняем запрос к серверу получение всех задач
  getAll: () => {
    return fetch(URL).then((response) =>
      response.json()
    ); //преобразуем ответ сервера в нужный нам формат
  },

  //! будем выполнять запрос к серверу для получения данных конкретной задачи по ее id
  getById: (id) => {
    return fetch(`${URL}/${id}`).then(
      (response) => response.json()
    );
  },

  //! добавление новая задача и добавлялась при нажатии на ENTER
  add: (task) => {
    return fetch(URL, {
      method: 'POST', //POST добавить новое
      headers,
      body: JSON.stringify(task),
    }).then((response) => response.json());
  },

  //!удаляем одну задачу с id
  delete: (id) => {
    return fetch(`${URL}/${id}`, {
      method: 'DELETE',
    });
  },

  //!удалить все задачи
  deleteAll: (tasks) => {
    return Promise.all(
      tasks.map(({ id }) => tasksAPI.delete(id))
    );
  },

  //!чекбокс задач и сколько задач выполнено из скольки
  toggleComplete: (id, isDone) => {
    return fetch(`${URL}/${id}`, {
      method: 'PATCH', //PATCH изменить существующее
      headers,
      body: JSON.stringify({ isDone }), //передаем только те данные которые подверглись изменениям
    });
  },
};

export default tasksAPI;
