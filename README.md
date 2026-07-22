# React + Vite

- npm install
- npm run server
- npm run dev

##### сборка

- npm run build

##### форматирование

- npx prettier --write

##### посмотреть результат продакшен сборки (пользователь)

- npm run preview

##### пакеты для деплоя

- npm i -D gh-pages cpy-cli npm-run-all
  ! в package.json вносим новые команды
  - "scripts": {
  - "copy404": "cpy dist/index.html dist --rename=404.html --flat",

  ```
  "copy404" - в папке дист автоматически продублировать индекс HTML для 404 страницы,
   чтобы редирукты в финальном приложении  отрабатывали корректно
   и вели на нашу собственную версию  страницы 404
  ```

  - "predeploy": "run-s build copy404",

  ```
  "predeploy" команда предеплой что-бы не забывать билдеть проект и вызвать команду копи 404
  ```

  - "deploy": "gh-pages -d dist"

  ```
  Diploy содержимое папки dist на GitHub Pages
  ```

  },

  ##### Diploy

  npm run deploy

  ***

# Future Sliced Design

## 1. app

---

```
app - для инициализации приложения, глобальных стилей, роутер.
```

##### routing

_Router.jsx_
styles
App.jsx

## 2. pages

---

```
 pages - содержит компоненты отдельных страниц которые участвуют в маршрутизации(собираются виджеты, фичи в готовую страницу) бизнес-логики здесь нет
```

#### TaskPage

_TaskPage.jsx_

#### TasksPage

_TasksPage.jsx_

## 3. widgets

---

```
  widgets - находятся самодостаточные, крупные блоки интерфейса реализующии полноценный пользовательский сценарий(контейнер с формами добавления новой задачи, поиском, статистикой и списком задач)
```

#### Todo

_Todo.jsx_

## 4. features

---

```
  features - отдельные функциональные возможности приложения (добавить задачу, поиск, просмотр статистики задач)
```

#### add-task

_AddTaskForm.jsx_

#### search-task

_SearchTaskForm.jsx_

#### stats

_TodoInfo.jsx_

## 5. entities

---

```
  entities - основные доменные сущности приложения модель данных и UL этой сущности(здесь держим контекст задач, бизнес-хуки и элементы списка)
```

### todo

#### model

_TasksContext.jsx_
_useIncompleteTasks.js_
_useTasks.js_
_useTasksLocalStorage.js_

#### ul

##### _TodoItem_

##### _TodoList_

## 6. shared

---

```
 shared - переиспользуемые компоненты без доменной логики, утилиты и различные Api(кнопки, поля ввода, ссылки, Api) слой не импортирует ничего сверху
```

### api

##### _tasks_

_local.js_
_server.js_

### assets

##### _icons_

### components

##### _Button_

##### _Field_

##### _RouterLink_

### hooks

_useCombinedRefs.js_

### constants

_index.js_

### utils

_highlight.js_
