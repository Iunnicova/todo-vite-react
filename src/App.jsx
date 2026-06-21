// import { Todo } from './components/Todo.jsx';
// import { TasksProvider } from './context/TasksContext.jsx';
import Router from './Router';
import TaskPage from './components/pages/TaskPage';
import TasksPage from './components/pages/TasksPage';

const App = () => {
  const routes = {
    '/': TasksPage,
    '/tasks/123': TaskPage,
    '*': () => (
      <div>
        404 Page not Found / Страница не
        найдена{' '}
      </div>
    ),
  };

  return (
    //!перенесли в TasksPage
    // <TasksProvider>
    //   <Todo />
    // </TasksProvider>
    
    //!заменяем на роутер который будет переключать страницы
    <Router routes={routes} />
  );
};
export default App;
