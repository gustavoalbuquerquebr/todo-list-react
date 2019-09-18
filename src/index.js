import React from 'react';
import ReactDOM from 'react-dom';
import "./index.css";
import uuid from "uuid/v4";

class AddTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ input: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.handleSubmit(this.state.input);
    this.setState({ input: "" });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" value={this.state.input} onChange={this.handleChange} />
        <input type="submit" />
      </form>
      );
  }
}

class TodoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      isCompleted: false,
      input: this.props.task,
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClick() {
    this.setState({
      isCompleted: !this.state.isCompleted
    });
  }

  handleToggle() {
    this.setState({
      isEditing: !this.state.isEditing,
    });
  }

  handleChange(e) {
    this.setState({
      input: e.target.value
    });
  }

  handleSubmit (e) {
    e.preventDefault();
    this.props.handleSubmit(this.props.id, this.state.input);
    this.setState({
      isEditing: false,
    });
  }

  handleDelete() {
    this.props.handleDelete(this.props.id);
  }

  render() {
    const spanStyle = {
      textDecoration: this.state.isCompleted ? "line-through" : "none",
    };

    return (
      <li>
        {!this.state.isEditing && (
          <>
            <span style={spanStyle} onClick={this.handleClick}>{this.props.task}</span>
            <button onClick={this.handleToggle}>E</button>
            <button onClick={this.handleDelete}>X</button>
          </>
        )}
        {this.state.isEditing && (
          <form onSubmit={this.handleSubmit}>
            <input type="text" value={this.state.input} onChange={this.handleChange} />
            <input type="submit" />
          </form>
        ) }
      </li>
    );
  }
}

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [
        {
          id: uuid(),
          task: "My task number 1",
        },
        {
          id: uuid(),
          task: "My task number 2",
        },
      ]
    };

    this.handleEditSubmit = this.handleEditSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddSubmit = this.handleAddSubmit.bind(this);
  }

  handleEditSubmit(id, input) {
    const todos = this.state.todos.map(todo => ({ ...todo }));
    const todosAfterEdit = todos.map(todo => {
      if (todo.id === id) todo.task = input;
      return todo;
    });
    this.setState({ todos: todosAfterEdit });
  }

  handleDelete(id) {
    const todos = this.state.todos.map(todo => ({ ...todo }));
    const todosAfterDelete = todos.filter(todo => todo.id !== id);
    this.setState({ todos: todosAfterDelete });
  }

  handleAddSubmit(input) {
    const todos = this.state.todos.map(todo => ({ ...todo }));
    const newTodo = {
      id: uuid(),
      task: input,
    };
    todos.push(newTodo);
    this.setState({ todos });
  }

  render() {
    // console.log(this.state.todos);
    const todos = this.state.todos.map(todo => (
      <TodoItem key={todo.id} id={todo.id} task={todo.task} handleSubmit={this.handleEditSubmit} handleDelete={this.handleDelete} />
    ));

    return (
      <main>
        <h1>Todo List</h1>
        <ul>
          { todos }
        </ul>
        <AddTodo handleSubmit={this.handleAddSubmit} />
      </main>
    );
  }
}

ReactDOM.render(<TodoList />, document.getElementById('root'));
