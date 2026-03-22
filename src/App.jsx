//! списки и метод mep учимся рендерить массивы в разметке
// пробегаемся по массиву mep и возвращаем новый массив
const App = () => {

  return (
      <div className="todo">
      <h1 className="todo__title">To Do List</h1>
      <form className="todo__form">
        <div className="todo__field field">
          <label
            className="field__label"
            htmlFor="new-task"
          >
            New task
          </label>
          <input
            className="field__input"
            id="new-task"
            placeholder=" "
            autoComplete="off"
          />
        </div>
        <button className="button" type="submit">Add</button>
      </form>
      <form className="todo__form">
        <div className="todo__field field">
          <label
            className="field__label"
            htmlFor="search-task"
          >
            Search task
          </label>
          <input
            className="field__input"
            id="search-task"
            placeholder=" "
            autoComplete="off"
            type="search"
          />
        </div>
      </form>
      <div className="todo__info">
        <div className="todo__total-tasks">Total tasks: <span>0</span></div>
        <button className="todo__delete-all-button" type="button">Delete all</button>
      </div>
      <ul className="todo__list">
        <li className="todo__item todo-item">
          <input
            className="todo-item__checkbox"
            id="task-1"
            type="checkbox"
            checked
          />
          <label
            className="todo-item__label"
            htmlFor="task-1"
          >
            Task 1
          </label>
          <button
            className="todo-item__delete-button"
            aria-label="Delete"
            title="Delete"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 5L5 15M5 5L15 15"
                stroke="#757575"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </li>
        <li className="todo__item todo-item">
          <input
            className="todo-item__checkbox"
            id="task-2"
            type="checkbox"
          />
          <label
            className="todo-item__label"
            htmlFor="task-2"
          >
            Task 2
          </label>
          <button
            className="todo-item__delete-button"
            aria-label="Delete"
            title="Delete"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 5L5 15M5 5L15 15"
                stroke="#757575"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </li>
      </ul>
      <div className="todo__empty-message"></div>
    </div>
  )
}
export default App;

//! списки и метод mep учимся рендерить массивы в разметке
// // пробегаемся по массиву mep и возвращаем новый массив
// const App = () => {

// const tasks = [
//   "Покормить кота",
//   "Сварить покушать",
//   "Посмотреть видосик",
// ]
//   return (
//     <>
//       <h1 className='title'>To Do-vite-react</h1>
//       <ul style={{color: 'red', fontWeight: 700}}>
//         {tasks.map((task) => <li key={task}>{task}</li>)}
//       </ul>
//     </>
//   )
// }
// export default App;


//! вариант через if else
// const userName = 'Валентина'

// // true или false
// const isLoggedIn = true

// // если использовать if else то по другому вот так если тернарник смотрится слишком громоздко

// const App = () => {

// let content
//  if (isLoggedIn) {
//   content = <p>Меня зовут,{userName}!</p>
//  } else {
//   content = <button>авторизоваться</button>
//  }
//   return (
//     <>
//       <h1 className='title'>To Do-vite-react</h1>
//       {content}
//     </>
//   )
// }
// export default App;

//! вариант через тернарник
// const userName = 'Валентина'
// // true или false
// const isLoggedIn = true

// const App = () => {
//   return (
//     <div>
//       <h1 className='title'>To Do-vite-react</h1>
// {/* выводим число */}
//  <p>{new Date().toLocaleDateString()}</p> 

//       {/* 1 оператор && - если isLoggedIn true выводим Валентина иначе ничего*/}
//       {isLoggedIn && <p>Меня зовут, {userName}!</p>}

//       {/* 2 отображаем либо одно true либо другое false используем тернарник ? */}
//       <p>{isLoggedIn ? `Меня зовут, ${userName}!` : 'Пожалуйста, зарегистрируйтесь'}</p>

//       {/* 3  или Валя или кнопка*/}
//       {isLoggedIn ? <p>Меня зовут,{userName.toUpperCase()}! </p> : <button>авторизоваться</button>}
    
//     <hr />
//     <label htmlFor="email">Email:</label>
//     <input id="email" type="email" required />

//     </div>
//   )
// }
// export default App;
