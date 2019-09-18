import React from 'react';
import ReactDOM from 'react-dom';
import "./index.css";
import uuid from "uuid/v4";

function AddTodo(props) {
  const [input, setInput] = React.useState("");

  const handleChange = (e) => {
    setInput(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleSubmit(input);
    setInput("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={input} onChange={handleChange} />
      <input type="submit" />
    </form>
    );
}

function TodoItem (props) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [isCompleted, setIsCompleted] = React.useState(false);
  const [input, setInput] = React.useState(props.task);

  const handleClick = () => {
    this.setState({
      isCompleted: !this.state.isCompleted
    });
    setIsCompleted(!isCompleted);
  }

  const handleToggle = () => {
    setIsEditing(!isEditing);
  }

  const handleChange = (e) => {
    setInput(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleSubmit(props.id, input);
    setIsEditing(false);
  }

  const handleDelete = () => {
    props.handleDelete(props.id);
  }

  const spanStyle = {
    textDecoration: isCompleted ? "line-through" : "none",
  };

  return (
    <li>
      {!isEditing && (
        <>
          <span style={spanStyle} onClick={handleClick}>{props.task}</span>
          <button onClick={handleToggle}>E</button>
          <button onClick={handleDelete}>X</button>
        </>
      )}
      {isEditing && (
        <form onSubmit={handleSubmit}>
          <input type="text" value={input} onChange={handleChange} />
          <input type="submit" />
        </form>
      )}
    </li>
  );
}

function TodoList(props) {
  const defaultTodos = [
    {
      id: uuid(),
      task: "My task number 1",
    },
    {
      id: uuid(),
      task: "My task number 2",
    },
  ];

  const [todos, setTodos] = React.useState(defaultTodos);

  const handleEditSubmit = (id, input) => {
    const todosClone = todos.map(todo => ({ ...todo }));
    const todosAfterEdit = todosClone.map(todo => {
      if (todo.id === id) todo.task = input;
      return todo;
    });
    setTodos(todosAfterEdit);
  }

  const handleDelete = (id) => {
    const todosClone = todos.map(todo => ({ ...todo }));
    const todosAfterDelete = todosClone.filter(todo => todo.id !== id);
    setTodos(todosAfterDelete);
  }

  const handleAddSubmit = (input) => {
    const todosClone = todos.map(todo => ({ ...todo }));
    const newTodo = {
      id: uuid(),
      task: input,
    };
    todosClone.push(newTodo);
    setTodos(todosClone);
  }

  const todosUI = todos.map(todo => (
    <TodoItem key={todo.id} id={todo.id} task={todo.task} handleSubmit={handleEditSubmit} handleDelete={handleDelete} />
  ));

  return (
    <main>
      <h1>Todo List</h1>
      <ul>
        {todosUI}
      </ul>
      <AddTodo handleSubmit={handleAddSubmit} />
    </main>
  );
}

ReactDOM.render(<TodoList />, document.getElementById('root'));
