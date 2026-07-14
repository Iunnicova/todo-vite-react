# React + Vite

npm install
npm run server
npm run dev
npx prettier --write

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

### assets

##### _icons_

### components

##### _Button_

##### _Field_

##### _RouterLink_

### hooks

_useCombinedRefs.js_
