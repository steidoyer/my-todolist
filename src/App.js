import { useState, useCallback, useRef } from 'react';
import { useDispatch } from "react-redux";
import TodoInput from './components/TodoInput';
import TodoMenu from './components/TodoMenu';
import TodoList from './components/TodoList';
import { insertTodo, deleteTodo } from './modules/Todos';
import './assets/scss/style.scss';

const App = () => {
  const dispatch = useDispatch();

  const nextId = useRef(0);
  const inputRef = useRef(null);

  const [viewMode, setViewMode] = useState('all');
  const [aniMode, setAniMode] = useState(true);
  const [aniId, setAniId] = useState('');

  const changeAniMode = (a) => {
    setAniMode(a);
  };

  const changeAniId = (a) => {
    setAniId(a);
  };

  const updateViewTodo = (i) => {
    setViewMode(i);
  };

  const focusInput = () => {
    inputRef.current.focus();
  };

  const onInsert = (value) => {
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

    setAniId(nextId.current);
    dispatch(insertTodo(todo));
    nextId.current += 1;
    alert('새로운 할 일이 추가되었습니다.');
  // }, [todos]); // 어느게 맞는거지?
  }; // 어느게 맞는거지?


  const delTodo = useCallback(id => {
    // 삭제 버튼 클릭시 사용자 의사 체크
    if (window.confirm('할 일을 삭제하시겠습니까?')) {
      // 삭제할 때의 동작
      dispatch(deleteTodo(id));
      nextId.current -= 1;
    } else {
      // 삭제를 원하지 않을 때 동작
    };
  }, [dispatch]); // 어느게 맞는거지?

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
            <TodoMenu updateViewTodo={updateViewTodo} aniMode={aniMode} setAniMode={setAniMode} changeAniId={changeAniId}></TodoMenu>
          </div>
        </div>
        <div className="container box-main">
          <div className="box__inner">
            <TodoList delTodo={delTodo} viewMode={viewMode} aniMode={aniMode} setAniMode={setAniMode} aniId={aniId} setAniId={setAniId}></TodoList>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;