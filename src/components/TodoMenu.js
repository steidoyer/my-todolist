import { useCallback, useState } from "react";

const TodoMenu = ({ updateViewTodo, changeAniId }) => {
  const [select, setSelect] = useState(0); // 맨 처음 탭이 기본값이 되게

  const tabArr = [
    { name: 'todo-menu-1', content: '전체', viewMode: 'all' },
    { name: 'todo-menu-2', content: '할 일', viewMode: 'todo' },
    { name: 'todo-menu-3', content: '완료', viewMode: 'done' }
  ];

  
  const onTabMenuChangeHandler = useCallback((i, viewMode) => {
    setSelect(i);
      updateViewTodo(viewMode);
    // }
    changeAniId('');
  }, []);

  return (
    <ul className="list-todo-menu">
    {tabArr.map((tab, index) => (
      <li key={tab.name} className="item-todo-menu"><button type="button" onClick={() => onTabMenuChangeHandler(index, tab.viewMode)} className={index === select ? "btn-todo-menu btn-todo-menu--selected" : "btn-todo-menu"}>{tab.content}</button></li>
    ))}
    </ul>
  );
};

export default TodoMenu;