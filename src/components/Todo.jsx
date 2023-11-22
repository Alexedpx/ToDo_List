import { useState } from "react";

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  return (
    <>
      <div className="Header-wrapper">
        <h1>What's need to be done ?</h1>
      </div>
	  <div className="container-form">
      <div className="Form-wrapper">
        <h2>TO DO</h2>

        <Form
          addTodo={(todo) => {
            setTodos((prev) => [...prev, todo]);
          }}
        />
		

        <div className="todo-list">
          {todos.map((todo, index) => (
            <Todo
              onDelete={() => {
                setTodos((prev) => {
                 return prev.filter((_, y) => index !== y);
                });
              }}
              key={index}
            >
              {todo}
            </Todo>
          ))}
        </div>
      </div>
	  </div>
    </>
  );
}

const Form = ({ addTodo }) => {
  const onSubmit = (event) => {
    event.preventDefault();

    const todoText = event.currentTarget.elements.todo.value;
    addTodo(todoText);
	event.currentTarget.reset();
  };
  return (
    <form className="form-wrapper" onSubmit={onSubmit}>
      <input id="todo" className="input" type="text" placeholder="Add a task" />
      <Button type="submit">
        <strong>+</strong>
      </Button>
    </form>
  );
};

const Button = ({ children, ...props }) => {
  console.log(props);

  return (
    <button className="button" {...props}>
      {children}
    </button>
  );
};

const Todo = ({ children, onDelete }) => {
  return (
    <div className="Todo-wrapper">
      <Checkbox />
      <label className="todo-text">{children}</label>
      <button onClick={onDelete} className="todo-delete">
        <svg
          className="svg-trash"
          viewBox="0 0 25 20"
          fill="currentColor"
          height="1.8em"
          width="1.8em"
        >
          <path d="M6 7H5v13a2 2 0 002 2h10a2 2 0 002-2V7H6zm4 12H8v-9h2v9zm6 0h-2v-9h2v9zm.618-15L15 2H9L7.382 4H3v2h18V4z" />
        </svg>
      </button>
    </div>
  );
};

const Checkbox = () => {
  const [checked, setChecked] = useState(false);

  const onChange = (event) => {
    setChecked(event.target.checked);
  };
  return (
    <div className="checkbox">
      <input type="checkbox" checked={checked} onChange={onChange} />
      {checked && (
        <svg
          className="svg-icon"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
        >
          <path d="M0 11c2.761.575 6.312 1.688 9 3.438 3.157-4.23 8.828-8.187 15-11.438-5.861 5.775-10.711 12.328-14 18.917-2.651-3.766-5.547-7.271-10-10.917z" />
        </svg>
      )}
    </div>
  );
};
