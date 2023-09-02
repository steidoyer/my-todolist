import { useState, useRef, useEffect } from 'react';

const Todoitem = (props) => {
  const { todos, todo, updateTodo } = props;
  const [isEditable, setIsEditable] = useState(false);
  const [changedName, setChangedName] = useState(todo.name);
  const [todoState, setTodoState] = useState(todo.state);
  const inputRef = useRef();
  
  const delTodo = () => {
    const newTodos = todos.filter(action => action.id !== todo.id);
    updateTodo(newTodos);
  };
  
  const modifyTodo = () => {
    setIsEditable(true);
  };
  
  useEffect(() => {
    return () => {
      console.log('1');
      focusInput();
      console.log('3');
    }
  }, [isEditable]);
  
  const focusInput = () => {
    console.log('2');
    console.dir(inputRef);
    inputRef.current.focus(); // inputRef.current이 성립이 안됨
    console.log('??');
  };

  const modifyEndTodo = () => {
    const newTodos = todos.map(modifyTodo => modifyTodo.id === todo.id ? { ...modifyTodo, name: changedName } : modifyTodo);
    updateTodo(newTodos);
    setIsEditable(false);
  };

  const modifyCancelTodo = () => {
    setChangedName(todo.name); // 수정 취소하면 원래 투두 이름으로 다시 돌아가도록
    setIsEditable(false);
  };

  const modifyInputHandler = (e) => {
    setChangedName(e.target.value);
    console.log(changedName);
  };

  const modifyTodoStateCheck = () => {
    // 투두가 미완료일 때
    if (todoState === '') {
      const newTodos = todos.map(modifyTodo => modifyTodo.id === todo.id ? { ...modifyTodo, state: 'done'} : modifyTodo);
      setTodoState('done'); // 투두 상태 변경
      updateTodo(newTodos);
    } else if (todoState === 'done') { // 투두가 완료일 때
      const newTodos = todos.map(modifyTodo => modifyTodo.id === todo.id ? { ...modifyTodo, state: ''} : modifyTodo);
      setTodoState(''); // 투두 상태 변경
      updateTodo(newTodos);
    }
  };

  return (
    <li className="item-todo">
      {/* <div className="item-todo__inner layout-inner"> */}
        {/* 내용 수정 중인 상태가 아닐 때 */}
        {!isEditable && (
        <>
          {todo.state === 'done' ? (
          <button type="button" onClick={modifyTodoStateCheck} className="btn btn-todoitem btn-todo-state btn-todo-state--complete">
            <span className="txt-btn state-todo state-todo-complete a11y">완료</span>
          </button>
          ) : (
          <button type="button" onClick={modifyTodoStateCheck} className="btn btn-todoitem btn-todo-state btn-todo-state--incomplete">  
            <span className="txt-btn state-todo state-todo-incomplete a11y">미완료</span>
          </button>
          )}
          <div className="todo-name-area">
            <span className="txt-todo-name">{todo.name}</span>
          </div>
          <div className="todo-item-action">
            <button type="button" onClick={modifyTodo} className="btn btn-todoitem btn-todoitem-edit"><span className="material-symbols-outlined">edit</span></button>
            <button type="button" onClick={delTodo} className="btn btn-todoitem btn-todoitem-delete"><span className="material-symbols-outlined">delete</span></button>
          </div>
        </>
        )}
        {/* 내용 수정 중인 상태일 때 */}
        {isEditable && (
        <>
          {todo.state === 'done' ? (
          <button type="button" onClick={modifyTodoStateCheck} className="btn btn-todoitem btn-todo-state btn-todo-state--complete">
            <span className="txt-btn state-todo state-todo-complete a11y">완료</span>
          </button>
          ) : (
          <button type="button" onClick={modifyTodoStateCheck} className="btn btn-todoitem btn-todo-state btn-todo-state--incomplete">  
            <span className="txt-btn state-todo state-todo-incomplete a11y">미완료</span>
          </button>
          )}
          <div className="todo-name-area">
            <input type="text" onChange={modifyInputHandler} value={changedName} ref={inputRef} className="todo-name-input" />
            <button type="text" onClick={modifyCancelTodo} className="btn btn-todo-name btn-todo-name-cancel">
              <span className="material-symbols-outlined">close</span>
            </button>
            <button type="text" onClick={modifyEndTodo} className="btn btn-todo-name btn-todo-name-confirm">
              <span className="material-symbols-outlined">done</span>
            </button>
          </div>
          <div className="todo-item-action">
            <button type="button" onClick={delTodo} className="btn btn-todoitem btn-todoitem-delete"><span className="material-symbols-outlined">delete</span></button>
          </div>
        </>
        )}
        
      {/* </div> */}
    </li>
  );
};

export default Todoitem;