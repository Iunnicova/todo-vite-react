import { Todo } from './components/Todo.jsx';

const App = () => {
  console.log('Add')
  return <Todo />;
};
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
