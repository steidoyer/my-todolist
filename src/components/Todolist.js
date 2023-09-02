import TodoItem from './TodoItem';
import { useSelector } from "react-redux";

const TodoList = ({ delTodo, viewMode, aniMode, setAniMode, aniId, setAniId }) => {
  const todos = useSelector((state) => state.todos);

  const changeViewList = () => {
    if (viewMode === 'todo') { // 할 일만 보여주기
      return todos.filter(todo => todo.state === '');
    } else if (viewMode === 'done') { // 완료만 보여주기
      return todos.filter(todo => todo.state === 'done');
    } else { // 전체 보여주기
      return todos;
    }
  };

  const todoViewList = changeViewList();

  return (
    <ul className={`list-todo ${aniMode === true ? 'list-todo-ani' : ''}`}>
      {todoViewList.map(todo => (
        <TodoItem key={todo.id} todo={todo} delTodo={delTodo} aniMode={aniMode} setAniMode={setAniMode} aniId={aniId} setAniId={setAniId} viewMode={viewMode} />
      ))}
    </ul>
  );
};

export default TodoList;