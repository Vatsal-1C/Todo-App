import React, { useState } from "react";

function ToDoTable({ todos, updateTodo, deleteTodo }) {
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({ name: "", picture: "", dueDate: "" });

  const handleEditClick = (todo) => {
    setEditingId(todo.id);
    setEditValues({ name: todo.name, picture: todo.picture, dueDate: todo.dueDate });
  };

  const handleSave = () => {
    updateTodo(editingId, { ...todos.find((todo) => todo.id === editingId), ...editValues });
    setEditingId(null);
  };

  const sortedTodos = todos.slice().sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <table>
      <thead>
        <tr>
          <th>Picture</th>
          <th>Name</th>
          <th>Created Date</th>
          <th>Due Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {sortedTodos.map((todo) => (
          <tr key={todo.id}>
            <td>
              {editingId === todo.id ? (
                <input
                  type="text"
                  value={editValues.picture}
                  onChange={(e) => setEditValues({ ...editValues, picture: e.target.value })}
                />
              ) : (
                <img src={todo.picture} alt={todo.name} style={{ width: "50px" }} />
              )}
            </td>
            <td>
              {editingId === todo.id ? (
                <input
                  type="text"
                  value={editValues.name}
                  onChange={(e) => setEditValues({ ...editValues, name: e.target.value })}
                />
              ) : (
                todo.name
              )}
            </td>
            <td>{new Date(todo.date).toLocaleDateString()}</td>
            <td>
              {editingId === todo.id ? (
                <input
                  type="date"
                  value={editValues.dueDate}
                  onChange={(e) => setEditValues({ ...editValues, dueDate: e.target.value })}
                />
              ) : (
                new Date(todo.dueDate).toLocaleDateString()
              )}
            </td>
            <td>
              {editingId === todo.id ? (
                <button onClick={handleSave}>Save</button>
              ) : (
                <button onClick={() => handleEditClick(todo)}>Edit</button>
              )}
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ToDoTable;
