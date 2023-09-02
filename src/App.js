import { useState, useCallback, useRef } from 'react';
// import Todolist from './components/Todolist';
import TodoInput from './components/TodoInput';
import TodoMenu from './components/TodoMenu';
import Todoitem from './components/Todoitem';

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

  const nextId = useRef(3);
  const inputRef = useRef(null);

  const [todos, setTodos] = useState(Todos);
  const [viewMode, setViewMode] = useState(0);

  const updateTodo = (newTodos) => {
    setTodos(newTodos);
  };

  const updateViewTodo = (i) => {
    setViewMode(i);
  };

  const focusInput = () => {
    inputRef.current.focus();
  };

  // TodoInput.js에서 정의했던거 App.js로 이동
  const onInsert = useCallback(value => {
    // 아무것도 입력 안하면 입력 막음
    if (value === '') {
      alert('내용을 입력해주세요');

      focusInput();
      return;
    }

    const todo = {
      id: nextId.current,
      name: value,
      state: ''
    }

    updateTodo(todos.concat(todo));
    nextId.current += 1;

    alert('새로운 할 일이 추가되었습니다.');
  }, [todos]);

  // TodoItem.js에서 정의했던거 App.js로 이동
  const delTodo = useCallback(id => {
    updateTodo(todos.filter(todo => todo.id !== id));
    nextId.current -= 1;
  }, [todos]);

  return (
    <div className="wrap">
      <header className="header">
        <div className="layout-inner">
          <h1 className="tit-main">My Todolist</h1>
        </div>
      </header>
      <main className="main container">
        <div className="container box-main todo-input">
          <div className="todo-input__inner layout-inner">
            <TodoInput onInsert={onInsert} inputRef={inputRef} />
          </div>
        </div>
        <div className="container box-main todo-menu">
          <div className="box__inner todo-menu__inner">
            <TodoMenu updateViewTodo={updateViewTodo}></TodoMenu>
          </div>
        </div>
        <div className="container box-main">
          <div className="box__inner">
            <ul className="list-todo">
            { viewMode === 0 && // 전체
              todos.map(todo => (
              <Todoitem key={todo.id} todo={todo} todos={todos} updateTodo={updateTodo} delTodo={delTodo} />
              ))
            }
            { viewMode === 1 && // 할 일
              todos.map(todo => todo.state !== 'done' ? (
              <Todoitem key={todo.id} todo={todo} todos={todos} updateTodo={updateTodo} delTodo={delTodo} />
              ) : null)
            }
            { viewMode === 2 && // 완료
              todos.map(todo => todo.state === 'done' ? (
              <Todoitem key={todo.id} todo={todo} todos={todos} updateTodo={updateTodo} delTodo={delTodo} />
              ) : null)
            }
            </ul>
            {/* <Todolist todos={todos} updateTodo={updateTodo} delTodo={delTodo}></Todolist> */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;