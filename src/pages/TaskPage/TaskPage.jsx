import tasksAPI from '@/shared/api/tasks';
import { useState, useEffect } from 'react';

const TaskPage = (props) => {
  const { params } = props;
  const taskId = params.id;
  const [task, setTask] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  //! будем выполнять запрос к серверу для получения данных конкретной задачи по ее id
  useEffect(() => {
    tasksAPI
      .getById(taskId)
      .then((taskData) => {
        setTask(taskData);
        setHasError(false);
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  //!проверка если запрос к серверу еще не случился выводим Загрузка...
  if (isLoading) {
    return <div>Loading.../Загрузка...</div>;
  }

  //! проверка если hasError истинна
  if (hasError) {
    return <div>Task not found!/Задание не найдено!</div>;
  }

  return (
    <div>
      <h1>{task.title}</h1>
      <p>{task.isDone ? 'Задача выполнена' : 'Задача не выполнена'}</p>
    </div>
  );
};

export default TaskPage;
