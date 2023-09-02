import { useState, useCallback } from 'react';

const TodoInput = ({ onInsert, inputRef }) => {
  const [value, setValue] = useState('');
  
  // 컴포넌트가 리랜더링될 때마다 이전에 만들어 놓은 함수를 재사용할 수 있도록 useCallback Hook 사용
  const inputTextHandler = useCallback(e => {
    setValue(e.target.value);
  }, []);

  // 컴포넌트가 리랜더링될 때마다 이전에 만들어 놓은 함수를 재사용할 수 있도록 useCallback Hook 사용
  const onSubmit = useCallback(e => {
    onInsert(value);
    setValue('');

    e.preventDefault();

  }, [onInsert, value]);

  return (
    <>
      <form onSubmit={onSubmit} >
        <div className="todo-input__form">
          <input type="text" value={value} onChange={inputTextHandler} className="input-todo" ref={inputRef}/>
          <button type="submit" className="btn-todo-input"><span className="a11y">추가</span></button>
        </div>
      </form>
    </>
  );
};

export default TodoInput;