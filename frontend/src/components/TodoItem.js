import React from "react";
import "../global.css";

const TodoItem = ({ todo, toggleComplete, deleteTodo }) => {
  if (!todo) {
    console.error("TodoItem component received an undefined `todo` prop.");
    return null;
  }

  return (
    <li className="items">
      <div className="todo-item">
        <span
          style={{ textDecoration: todo.completed ? "line-through" : "none" }}
          onClick={() => toggleComplete(todo._id)}
          className="text"
        >
          {todo.text}
        </span>
        <button onClick={() => deleteTodo(todo._id)} className="button">
          Delete
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
