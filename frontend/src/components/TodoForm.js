import React, { useState } from "react";
import "../global.css";

function TodoForm({ addTodo }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    addTodo(text);
    setText(""); // Yeni bir todo eklendikten sonra input'u temizler
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new todo..."
        className="inpt"
      />
      <button type="submit" className="button add">
        Add
      </button>
    </form>
  );
}

export default TodoForm;
