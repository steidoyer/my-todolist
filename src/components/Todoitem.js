import { useState, useRef, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { modifyName, modifyState } from '../modules/Todos';

const TodoItem = (props) => {
  const { todo, delTodo, aniMode, setAniMode, aniId, setAniId, viewMode } = props; // props 쓰는 방법 통일하기-내가 편한대로
  const [isEditable, setIsEditable] = useState(false);
  const [changedName, setChangedName] = useState(todo.name);
  const [toDoAniClass, setToDoAniClass] = useState('');
  const [shouldRender, setShouldRender] = useState(true); // 필요 없는 state 같음 - 추후 정리
  const [listNewTodo, setListNewTodo] = useState(() => { // 새 todo인가 아닌가
    if (todo.id !== aniId) {
      return false;
    } else {
      return true;
    }
  });
  const [todoStateChanged, setTodoStateChanged] = useState(false); // todo의 상태가 바뀌었는가 바뀌지 않았는가
  
  const [checked, setChecked] = useState(todo.state);
  
  const [testValue, setTestValue] = useState(0); // 컴포넌트 각각 가지고 있음. 별개로 동작

  const inputRef = useRef(null);
  const dispatch = useDispatch();

  const modifyTodo = () => {
    setIsEditable(true);
  };
  
  useEffect(() => {
    if (isEditable) {
      focusInput();
    }
  }, [isEditable]);

  useEffect(() => {
    if (listNewTodo) { // listNewTodo가 true면 처음 todo를 생성할 때 이 부분 2번 실행됨
      setToDoAniClass('item-todo--appear');
    } else { // listNewTodo가 false면 처음 todo를 생성할 때 이 부분 1번 실행됨
      setToDoAniClass('item-todo--disappear');
    }
  }, [listNewTodo]);
  
  const focusInput = () => {
    inputRef.current.focus();
  };

  const modifyCompleteTodo = (id) => {
    if (changedName === '') {
      alert('할 일의 이름을 입력해주세요.');
      focusInput();

      return;
    }

    dispatch(modifyName(id, changedName));
    setIsEditable(false);
  };

  const modifyCancelTodo = () => {
    setChangedName(todo.name); // 수정 취소하면 원래 투두 이름으로 다시 돌아가도록
    setIsEditable(false);
  };

  const modifyInputHandler = (e) => {
    setChangedName(e.target.value);
  };

  const modifyTodoStateCheck = (id, state) => {
    setTodoStateChanged(true); // todo 상태가 변하였음

    // 체크박스 클릭했을 때 viewMode에 따라서 효과 변경
    if (viewMode === 'all') { // 전체 탭
      if (state === '') { // todo가 완료로 바뀜.
        setChecked('done');
      } else if (state === 'done') { // todo가 할 일로 바뀜
        setChecked('');
      }
      dispatch(modifyState(id, state)); // animation이 없으므로 바로 todo의 상태를 변경
    } else if (viewMode === 'todo') { // 할 일 탭
      if (state === '') { // todo가 완료로 바뀜.
        setAniMode(true);
        setAniId(todo.id);
        setListNewTodo(false);
        setChecked('done');
      } else if (state === 'done') { // todo가 할 일로 바뀜
        setAniMode(false);
        setAniId('');
        setChecked('');
      }
    } else if (viewMode === 'done') { // 완료 탭
      if (state === '') { // todo가 완료로 바뀜
        setAniMode(true);
        setChecked('done');
      } else if (state === 'done') { // todo가 할 일로 바뀜
        setListNewTodo(false);
        setAniMode(true);
        setAniId(todo.id);
        setChecked('');
      }
    }
  };

  const onAnimationEnd = (id, state) => {
    if (todoStateChanged) {
      dispatch(modifyState(id, state)); // todo의 상태가 변경되었을 때만 실행되어야 함
      setTodoStateChanged(false);
    }
  };

  return (
    shouldRender ? (<li className={`item-todo ${(aniMode && aniId === todo.id) ? toDoAniClass : ''}`} onAnimationEnd={() => onAnimationEnd(todo.id, todo.state)}>
      {checked === 'done' ? (
      <button type="button" onClick={() => modifyTodoStateCheck(todo.id, todo.state)} className="btn btn-todoitem btn-todo-state btn-todo-state--complete">
        <span className="txt-btn state-todo state-todo-complete a11y">완료</span>
      </button>
      ) : (
      <button type="button" onClick={() => modifyTodoStateCheck(todo.id, todo.state)} className="btn btn-todoitem btn-todo-state btn-todo-state--incomplete">  
        <span className="txt-btn state-todo state-todo-incomplete a11y">미완료</span>
      </button>
      )}
    {!isEditable ? (
      <>
      {/* 내용 수정 중인 상태가 아닐 때 */}
        <div className="todo-name-area">
          <span className="txt-todo-name">{`${todo.name} | aniId: ${aniId} / todo.id: ${todo.id}`}</span>
        </div>
        <div className="todo-item-action">
          <button type="button" onClick={modifyTodo} className="btn btn-todoitem btn-todoitem-edit"><span className="material-symbols-outlined">edit</span></button>
          <button type="button" onClick={() => delTodo(todo.id)} className="btn btn-todoitem btn-todoitem-delete"><span className="material-symbols-outlined">delete</span></button>
        </div>
      </>
    ) : (
      <>
        {/* 내용 수정 중인 상태일 때 */}
        <div className="todo-name-area">
          <input type="text" onChange={modifyInputHandler} value={changedName} ref={inputRef} className="todo-name-input" />
          <button type="text" onClick={modifyCancelTodo} className="btn btn-todo-name btn-todo-name-cancel">
            <span className="material-symbols-outlined">close</span>
          </button>
          <button type="text" onClick={() => modifyCompleteTodo(todo.id)} className="btn btn-todo-name btn-todo-name-confirm">
            <span className="material-symbols-outlined">done</span>
          </button>
        </div>
        <div className="todo-item-action">
          <button type="button" onClick={() => delTodo(todo.id)} className="btn btn-todoitem btn-todoitem-delete"><span className="material-symbols-outlined">delete</span></button>
        </div>
      </>
    )}
    </li>)
    : '');
};

export default TodoItem;