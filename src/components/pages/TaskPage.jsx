import tasksAPI from '@/api/tasksAPL';
import { useState, useEffect } from 'react';

const TaskPage = (props) => {
  //   const { params } = props;

  const taskId = '123';
  //   const taskId = params.id;
  const [task, setTask] = useState(null);

  const [isLoading, setIsLoading] =
    useState(true);
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
    return (
      <div>
        Task not found!/Задание не найдено!
      </div>
    );
  }

  //   //!а если все эти проверки не отработали значит задача успешно загрузилась

  return (
    <div>
      <h1>{task.title}</h1>
      {/* если task isDone то задача выполнена в ином случае задача не выполнена*/}
      <p>
        {task.isDone
          ? 'Задача выполнена'
          : 'Задача не выполнена'}
      </p>
    </div>
  );
};

export default TaskPage;
