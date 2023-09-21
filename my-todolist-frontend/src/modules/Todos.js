// 액션 타입 정의
const INSERT = 'todos/INSERT';
const DELETE = 'todos/DELETE';
const MODIFY_NAME = 'todos/MODIFY_NAME';
const MODIFY_STATE = 'todos/MODIFY_STATE';

// 액션 생성 함수
// INSERT Action: type(INSERT) + 추가할 todo
export const insertTodo = (todo) => {
  return {
    type: INSERT,
    todo: {
      id: todo.id,
      name: todo.name,
      state: ''
    }
  };
};

// DELETE Action: type(DELETE) + id
export const deleteTodo = (id) => {
  return {
    type: DELETE,
    id
  };
};

// MODIFY_NAME Action: type(MODIFY_NAME) + id + name
export const modifyName = (id, name) => {
  return {
    type: MODIFY_NAME,
    id,
    name
  };
};

// MODIFY_STATE Action: type(MODIFY_STATE) + id + state
export const modifyState = (id, state) => {
  return {
    type: MODIFY_STATE,
    id,
    state
  };
};

const initialState = {
  todos: [],
};

function todoReducer(state = initialState, action) {
  switch (action.type) {
    case INSERT:
      return {
        ...state,
        todos: state.todos.concat(action.todo),
      };
    case DELETE:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.id),
      };
    case MODIFY_NAME:
      return {
        ...state,
        todos: state.todos.map(todo => todo.id === action.id ? { ...todo, name: action.name} : todo),
      };
    case MODIFY_STATE: {
      let modifyAction = null;
      if (action.state === 'done') {
        modifyAction = '';
      } else {
        modifyAction = 'done';
      }
      return {
        ...state,
        todos: state.todos.map(todo => todo.id === action.id ? { ...todo, state: modifyAction} : todo),
      };
    }
    default:
      return state;
  }
}

export default todoReducer;