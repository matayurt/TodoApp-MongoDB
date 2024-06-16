import React, { useState, useEffect } from "react";
import axios from "axios";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import "./global.css";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/todos")
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => console.error("GET Error: ", error));
  }, []);

  const addTodo = (text) => {
    axios
      .post("http://localhost:5001/api/todos", { text })
      .then((response) => {
        setTodos([...todos, response.data]);
        console.log("Added Todo:", response.data);
      })
      .catch((error) => console.error("POST Error: ", error));
  };

  const toggleComplete = (id) => {
    const todo = todos.find((t) => t._id === id);
    axios
      .put(`http://localhost:5001/api/todos/${id}`, {
        completed: !todo.completed,
      })
      .then((response) => {
        const updatedTodos = todos.map((t) =>
          t._id === id ? response.data : t
        );
        setTodos(updatedTodos);
      })
      .catch((error) => console.error("PUT Error: ", error));
  };

  const deleteTodo = (id) => {
    axios
      .delete(`http://localhost:5001/api/todos/${id}`)
      .then((response) => {
        console.log("Response status:", response.status);
        if (response.status !== 200) {
          throw new Error("Todo could not be deleted");
        }
        console.log("Delete response data:", response.data);
        const updatedTodos = todos.filter((t) => t._id !== id);
        setTodos(updatedTodos);
      })
      .catch((error) => {
        console.error("DELETE Error: ", error);
        if (error.response) {
          console.error("Response data: ", error.response.data);
          console.error("Response status: ", error.response.status);
          console.error("Response headers: ", error.response.headers);
        }
      });
  };

  return (
    <div className="center">
      <div className="container">
        <h1 className="title">To Do List</h1>
        <TodoForm addTodo={addTodo} />
        <TodoList
          todos={todos}
          toggleComplete={toggleComplete}
          deleteTodo={deleteTodo}
        />
      </div>
    </div>
  );
}

export default App;
