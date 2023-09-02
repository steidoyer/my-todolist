import { useState } from 'react';
import Todolist from './components/Todolist';
import TodoInput from './components/TodoInput';
import './assets/scss/style.scss';

const App = () => {
  const Todos = [
    {
      id: 1,
      name: '공부하기',
      state: 'done'
    },
    {
      id: 2,
      name: '잠자기',
      state: ''
    },
  ];

  const [todos, setTodos] = useState(Todos);

  const updateTodo = (newTodos) => {
    setTodos(newTodos);
  };

  return (
    <div className="wrap">
      <header className="header">
        <div class="layout-inner">
          <h1 className="tit-main">My Todolist</h1>
        </div>
      </header>
      <main className="main container">
        <div className="container box-main todo-input">
          <div className="todo-input__inner layout-inner">
            <TodoInput todos={todos} updateTodo={updateTodo} />
          </div>
        </div>
        <div className="container box-main">
          <div className="box__inner">
            <Todolist todos={todos} updateTodo={updateTodo}></Todolist>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;