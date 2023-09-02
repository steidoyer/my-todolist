import Todoitem from './Todoitem';

const Todolist = ({ todos, updateTodo, delTodo }) => {
  
  return (
    <ul className="list-todo">
      {todos.map(todo => (
        <Todoitem key={todo.id} todo={todo} todos={todos} updateTodo={updateTodo} delTodo={delTodo} />
      ))}
    </ul>
  );
};

export default Todolist;