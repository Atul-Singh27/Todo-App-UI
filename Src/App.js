import React, { useEffect, useState } from "react";

const API_URL = process.env.REACT_APP_API_URL;

function App() {
  const [todos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");

  // Load todos from backend
  const fetchTodos = () => {
    fetch(`${API_URL}/`)
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Add todo
  const addTodo = (e) => {
    e.preventDefault();
    if (!newTitle) return;

    fetch(`${API_URL}/add`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `title=${encodeURIComponent(newTitle)}`,
    })
      .then(() => {
        setNewTitle("");
        fetchTodos();
      })
      .catch((err) => console.error(err));
  };

  // Toggle complete
  const toggleTodo = (id) => {
    fetch(`${API_URL}/update/${id}`)
      .then(() => fetchTodos())
      .catch((err) => console.error(err));
  };

  // Delete todo
  const deleteTodo = (id) => {
    fetch(`${API_URL}/delete/${id}`)
      .then(() => fetchTodos())
      .catch((err) => console.error(err));
  };

  return (
    <div style={{ maxWidth: 600, margin: "50px auto", padding: 20 }}>
      <h1 style={{ textAlign: "center" }}>Todo App</h1>

      {/* Add Todo Form */}
      <form onSubmit={addTodo} style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Enter task..."
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          style={{ width: "70%", padding: 8, marginRight: 8 }}
        />
        <button type="submit" style={{ padding: "8px 16px" }}>
          Add
        </button>
      </form>

      {/* Todo List */}
      {todos.map((todo) => (
        <div
          key={todo.id}
          style={{
            padding: 15,
            marginBottom: 10,
            border: "1px solid #ccc",
            borderRadius: 6,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <span
              style={{
                textDecoration: todo.complete ? "line-through" : "none",
                marginRight: 10,
              }}
            >
              {todo.id} | {todo.title}
            </span>
            <span
              style={{
                padding: "2px 6px",
                borderRadius: 4,
                backgroundColor: todo.complete ? "green" : "gray",
                color: "white",
                fontSize: 12,
              }}
            >
              {todo.complete ? "Complete" : "Not Complete"}
            </span>
          </div>

          <div>
            <button
              onClick={() => toggleTodo(todo.id)}
              style={{ marginRight: 8 }}
            >
              Update
            </button>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
