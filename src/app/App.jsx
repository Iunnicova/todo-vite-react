import Router from './routing/Router';
import TaskPage from '../pages/TaskPage';
import TasksPage from '../pages/TasksPage';

import './styles';

const App = () => {
  const routes = {
    '/': TasksPage,
    '/tasks/:id': TaskPage,
    '*': () => <div>404 Page not Found / 404 Страница не найдена</div>,
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
