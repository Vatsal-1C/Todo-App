import React, { useState, useEffect } from "react";

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

  const filteredTodos = todos.filter(todo => !todo.isExpired);
  const sortedTodos = filteredTodos.slice().sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <table className="min-w-full mt-6 table-auto bg-white rounded-lg shadow-md overflow-hidden">
      <thead className="bg-gray-200">
        <tr>
          <th className="p-4 text-left font-semibold text-gray-700">Picture</th>
          <th className="p-4 text-left font-semibold text-gray-700">Name</th>
          <th className="p-4 text-left font-semibold text-gray-700">Created Date</th>
          <th className="p-4 text-left font-semibold text-gray-700">Due Date</th>
          <th className="p-4 text-left font-semibold text-gray-700">Actions</th>
        </tr>
      </thead>
      <tbody>
        {sortedTodos.map((todo) => (
          <tr key={todo.id} className={`border-t ${todo.isExpired ? 'bg-gray-300' : 'bg-white'}`}>
            <td className="p-4">
              {editingId === todo.id ? (
                <input
                  type="text"
                  value={editValues.picture}
                  onChange={(e) => setEditValues({ ...editValues, picture: e.target.value })}
                  className="border border-gray-300 rounded-lg p-2 w-20"
                />
              ) : (
                <img src={todo.picture} alt={todo.name} className="w-12 h-12 object-cover rounded-full" />
              )}
            </td>
            <td className="p-4">
              {editingId === todo.id ? (
                <input
                  type="text"
                  value={editValues.name}
                  onChange={(e) => setEditValues({ ...editValues, name: e.target.value })}
                  className="border border-gray-300 rounded-lg p-2 w-40"
                />
              ) : (
                todo.name
              )}
            </td>
            <td className="p-4">{new Date(todo.date).toLocaleDateString()}</td>
            <td className="p-4">
              {editingId === todo.id ? (
                <input
                  type="date"
                  value={editValues.dueDate}
                  onChange={(e) => setEditValues({ ...editValues, dueDate: e.target.value })}
                  className="border border-gray-300 rounded-lg p-2"
                />
              ) : (
                new Date(todo.dueDate).toLocaleDateString()
              )}
            </td>
            <td className="p-4 flex gap-4">
              {editingId === todo.id ? (
                <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                  Save
                </button>
              ) : (
                <button onClick={() => handleEditClick(todo)} className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600">
                  Edit
                </button>
              )}
              <button onClick={() => deleteTodo(todo.id)} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ name: "", picture: "", date: "", dueDate: "" });

  const checkExpired = (dueDate) => {
    const dueDateObj = new Date(dueDate);
    const currentDate = new Date();
    return dueDateObj < currentDate;
  }

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    const updatedTodos = storedTodos.map((todo) => ({
      ...todo,
      isExpired: checkExpired(todo.dueDate)
    }));
    setTodos(updatedTodos);
  }, []);

  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  const addTodo = () => {
    if (newTodo.name && newTodo.picture && newTodo.date && newTodo.dueDate) {
      const newTodoItem = { id: Date.now(), ...newTodo, isExpired: checkExpired(newTodo.dueDate) };
      setTodos((prev) => {
        const updatedTodos = [...prev, newTodoItem];
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
        return updatedTodos;
      });
      setNewTodo({ name: "", picture: "", date: "", dueDate: "" });
    }
  };

  const updateTodo = (id, updatedTodo) => {
    const updatedTodos = todos.map((todo) => (todo.id === id ? updatedTodo : todo));
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-4xl font-semibold text-center text-gray-800 mb-6">To-Do List</h1>
        <div className="flex flex-col gap-6 mb-6">
          <input
            type="text"
            placeholder="Item Name"
            value={newTodo.name}
            onChange={(e) => setNewTodo({ ...newTodo, name: e.target.value })}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Item Picture URL"
            value={newTodo.picture}
            onChange={(e) => setNewTodo({ ...newTodo, picture: e.target.value })}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="date"
            value={newTodo.date}
            onChange={(e) => setNewTodo({ ...newTodo, date: e.target.value })}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="date"
            value={newTodo.dueDate}
            onChange={(e) => setNewTodo({ ...newTodo, dueDate: e.target.value })}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addTodo}
            className="bg-blue-500 text-white font-semibold rounded-lg px-6 py-3 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add To-Do
          </button>
        </div>

        <ToDoTable todos={todos} updateTodo={updateTodo} deleteTodo={deleteTodo} />
      </div>
    </div>
  );
}

export default App;
