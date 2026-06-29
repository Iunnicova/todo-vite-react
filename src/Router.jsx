//Храним текущий путь, следить за изменениями и рендерить компонент который соответствует пути
import { useState, useEffect } from 'react';

const matchPath = (path, route) => {
  const pathParts = path.split('/');
  const routePaths = route.split('/');

  if (pathParts.length !== routePaths.length) {
    return null;
  }
  const params = {};
  for (let i = 0; i < routePaths.length; i++) {
    if (routePaths[i].startsWith(':')) {
      const paramName = routePaths[i].slice(1);

      params[paramName] = pathParts[i];
    } else if (routePaths[i] !== pathParts[i]) {
      return null;
    }
  }
  return params;
};

export const useRoute = () => {
  const [path, setPath] = useState(
    window.location.pathname
  );

  useEffect(() => {
    const onLocationChange = () => {
      setPath(window.location.pathname);
    };

    window.addEventListener(
      'popstate',
      onLocationChange
    ); //привязываем слушатель

    return () => {
      window.removeEventListener(
        'popstate',
        onLocationChange
      );
    };
  }, []);

  return path;
};

const Router = (props) => {
  const { routes } = props;
  const path = useRoute();

  // for (const route in routes) {
  //   const params = matchPath(path, route);

  //   if (params) {
  //     const Page = routes[route];

  //     return <Page params={params} />;
  //   }
  // }

  // const NotFound = routes['*'];
  // return <NotFound />;

  //!простой вариант для очень маленькой задачи
  // if(path.startsWith('/tasks/')) {
  //   const id = path.replace('/tasks', '')
  //   const TaskPage = routes['/tasks/:id']

  //   return <TaskPage params={{ id }}/>
  // }

  const Page = routes[path] ?? routes['*'];

  return <Page />;
};

export default Router;
