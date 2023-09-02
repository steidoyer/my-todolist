import Todoitem from './Todoitem';

const Todolist = ({ todos, updateTodo }) => {
  
  return (
    <ul className="list-todo">
      {todos.map(todo => (
        <Todoitem key={todo.id} todo={todo} todos={todos} updateTodo={updateTodo} />
      ))}
    </ul>
  );
};

export default Todolist;