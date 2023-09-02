import { useState } from 'react';

const TodoInput = ({ updateTodo, todos }) => {
  const [text, setText] = useState('');
  const addTodo = () => {
    // 아무것도 입력 안하면 입력 막음
    if (text === '') {
      alert('내용을 입력해주세요');
      return;
    }
    const todoPlus = {
      id: todos.length + 1,
      name: text,
      state: ''
    } 
    const newTodos = todos.concat(todoPlus);
    setText('');
    updateTodo(newTodos);
  };

  const inputTextHandler = (e) => {
    setText(e.target.value);
  };

  return (
    <>
      <input type="text" value={text} onChange={inputTextHandler} className="input-todo"/>
      <button type="button" onClick={addTodo} className="btn-todo-input"><span class="a11y">추가</span></button>
    </>
  );
};

export default TodoInput;