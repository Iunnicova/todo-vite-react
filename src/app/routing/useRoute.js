//отслеживает изменения пути в адресной строке и обновляет состояние при навигации

import { BASE_URL } from '@/shared/constants';
import { useState, useEffect } from 'react';

const getCurrentPath = () => {
  const pathname = window.location.pathname;

  return pathname.startsWith(BASE_URL)
    ? pathname.slice(BASE_URL.length - 1) || '/'
    : pathname;
};

export const useRoute = () => {
  const [path, setPath] = useState(getCurrentPath());

  useEffect(() => {
    const onLocationChange = () => {
      setPath(getCurrentPath());
    };

    window.addEventListener('popstate', onLocationChange); //привязываем слушатель

    return () => {
      window.removeEventListener('popstate', onLocationChange);
    };
  }, []);

  return path;
};
