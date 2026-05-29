//*хук решает одну конкретную задачу фщкус на первой невыполненой задаче и прокрутку к этой задаче
import { useRef } from 'react';

const useIncompleteTasks = (tasks) => {
  //!переходим к первой незавершенной задачи
  const firstIncompleteTaskRef = useRef(null);
  const firstIncompleteTaskId = tasks.find(
    ({ isDone }) => !isDone
  )?.id; //если такой элемент есть получаем его id

  return {
    firstIncompleteTaskRef,
    firstIncompleteTaskId,
  };
};

export default useIncompleteTasks;
