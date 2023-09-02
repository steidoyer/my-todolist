import { useCallback, useState } from "react";

const TodoMenu = ({ updateViewTodo }) => {
  const [select, setSelect] = useState(0); // 맨 처음 탭이 기본값이 되게

  const tabArr = [
    { name: 'todo-menu-1', content: '전체' },
    { name: 'todo-menu-2', content: '할 일' },
    { name: 'todo-menu-3', content: '완료' }
  ];

  const onClick = useCallback(i => {
    setSelect(i);
    updateViewTodo(i);
  }, []);

  return (
    <ul className="list-todo-menu">
    {tabArr.map((tab, index) => (
      <li key={tab.name} className="item-todo-menu"><button type="button" onClick={() => onClick(index)} className={index === select ? "btn-todo-menu btn-todo-menu--selected" : "btn-todo-menu"}>{tab.content}</button></li>
    ))}
    </ul>
  );
};

export default TodoMenu;