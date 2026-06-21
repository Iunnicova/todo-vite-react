import { TasksProvider } from "@/context/TasksContext";
import { Todo } from "../Todo";
const TasksPage = () => {
  return (
    <TasksProvider>
      <Todo/>
    </TasksProvider>
  );
};

export default TasksPage;
