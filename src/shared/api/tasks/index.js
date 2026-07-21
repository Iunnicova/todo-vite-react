// //!делаем развилку. В деф-режиме на локальном у нас будет работать JSON сервер ,а в билд-режиме, когда будем собирать сборку на порт опишка будет успешно работать через local Storag

import localAPI from './local';
import serverAPI from './server';

const isLocal = import.meta.env.VITE_STATIC_BACKEND === 'true';

const tasksAPI = isLocal ? localAPI : serverAPI;

export default tasksAPI;
