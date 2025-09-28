import React, { useState, useEffect } from "react";
import Navbar from "./navbar.jsx";
import { useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";

const Task = () => {
  const [tasks, setTasks] = useState([]);

  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newStatus, setNewStatus] = useState("Pending");
  const [newDueDate, setNewDueDate] = useState("");
  const [newPriority, setNewPriority] = useState("Low");
  const [newAssignedTo, setNewAssignedTo] = useState("");
  const [newRole, setNewRole] = useState("User");
  const navigate = useNavigate();

  const priorityClasses = {
    Low: "text-green-600 font-semibold",
    Medium: "text-yellow-600 font-semibold",
    High: "text-red-600 font-semibold",
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const fetchTasks = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/tasks");
      const data = await res.json();
      setTasks(data.map(t => ({ ...t, editMode: false })));
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const createTask = async (e) => {
    e.preventDefault();
    if (!newTitle || !newDescription || !newDueDate) {
      alert("Please fill all fields");
      return;
    }
    try {
      const res = await fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newTitle,
          description: newDescription,
          status: newStatus,
          dueDate: newDueDate,
          priority: newPriority,
          assignedTo: newAssignedTo,
          role: newRole,
        }),
      });
      if (res.ok) {
        fetchTasks();
        setNewTitle("");
        setNewDescription("");
        setNewStatus("Pending");
        setNewDueDate("");
        setNewPriority("Low");
        setNewAssignedTo("");
        setNewRole("User");
      }
    } catch (err) {
      console.error("Error creating task:", err);
    }
  };

  const toggleEdit = (index) =>
    setTasks(tasks.map((t, i) => i === index ? { ...t, editMode: !t.editMode } : t));

  const updateTaskField = (index, field, value) =>
    setTasks(tasks.map((t, i) => i === index ? { ...t, [field]: value } : t));

  const saveTask = async (task) => {
    try {
      const res = await fetch(`http://localhost:5000/api/tasks/${task._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });
      if (res.ok) fetchTasks();
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  const deleteTask = async (id) => {
    if (!window.confirm("Delete this task?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: "DELETE",
      });
      if (res.ok) fetchTasks();
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  return (
    <div>
      <div className="container mx-auto px-4 py-10 space-y-10">
        <div className="bg-white shadow-lg rounded-2xl p-8">
          <h2 className="text-center text-3xl font-bold mb-8">Create Task</h2>
          <form onSubmit={createTask} className="space-y-5">
            <div className="flex flex-col md:flex-row md:gap-4">
              <input
                type="text"
                placeholder="Title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="flex-1 p-3 border rounded-lg"
              />
              <input
                type="date"
                value={newDueDate}
                onChange={(e) => setNewDueDate(e.target.value)}
                className="flex-1 p-3 border rounded-lg"
              />
            </div>

            <textarea
              rows={4}
              placeholder="Description"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              className="w-full p-3 border rounded-lg"
            />

            <div className="flex flex-col md:flex-row md:gap-4">
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="flex-1 p-3 border rounded-lg"
              >
                <option>Pending</option>
                <option>In-Progress</option>
                <option>Completed</option>
              </select>
              <select
                value={newPriority}
                onChange={(e) => setNewPriority(e.target.value)}
                className="flex-1 p-3 border rounded-lg"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>

            <div className="flex flex-col md:flex-row md:gap-4">
              <input
                type="text"
                placeholder="Assigned To"
                value={newAssignedTo}
                onChange={(e) => setNewAssignedTo(e.target.value)}
                className="flex-1 p-3 border rounded-lg"
              />
              <select
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                className="flex-1 p-3 border rounded-lg"
              >
                <option>User</option>
                <option>Admin</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg"
            >
              Create Task
            </button>
          </form>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-8 max-h-[600px] overflow-y-auto">
          <h3 className="text-2xl font-bold mb-6 text-center">All Tasks</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.length === 0 && (
              <p className="text-center text-gray-500">No tasks available</p>
            )}

            {tasks.map((task, index) => (
              <div key={task._id} className="border rounded-lg shadow p-4 bg-gray-50">
                {task.editMode ? (
                  <>
                    <input
                      type="text"
                      value={task.title}
                      onChange={(e) => updateTaskField(index, "title", e.target.value)}
                      className="w-full mb-2 p-2 border rounded"
                    />
                    <textarea
                      value={task.description}
                      onChange={(e) =>
                        updateTaskField(index, "description", e.target.value)
                      }
                      className="w-full mb-2 p-2 border rounded"
                    />
                    <div className="flex gap-2 mb-2">
                      <select
                        value={task.status}
                        onChange={(e) =>
                          updateTaskField(index, "status", e.target.value)
                        }
                        className="flex-1 p-2 border rounded"
                      >
                        <option>Pending</option>
                        <option>In-Progress</option>
                        <option>Completed</option>
                      </select>
                      <select
                        value={task.priority}
                        onChange={(e) =>
                          updateTaskField(index, "priority", e.target.value)
                        }
                        className="flex-1 p-2 border rounded"
                      >
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                      </select>
                    </div>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={task.assignedTo}
                        onChange={(e) =>
                          updateTaskField(index, "assignedTo", e.target.value)
                        }
                        className="flex-1 p-2 border rounded"
                      />
                      <select
                        value={task.role}
                        onChange={(e) =>
                          updateTaskField(index, "role", e.target.value)
                        }
                        className="flex-1 p-2 border rounded"
                      >
                        <option>User</option>
                        <option>Admin</option>
                      </select>
                    </div>
                    <button
                      onClick={() => saveTask(task)}
                      className="w-full py-2 bg-green-600 hover:bg-green-700 text-white rounded"
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    <h5 className="text-xl font-bold">{task.title}</h5>
                    <p className="mb-2">{task.description}</p>
                    <p><strong>Status:</strong> {task.status}</p>
                    <p>
                      <strong>Priority:</strong>{" "}
                      <span className={priorityClasses[task.priority]}>
                        {task.priority}
                      </span>
                    </p>
                    <p><strong>Due:</strong> {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "N/A"}</p>
                    <p><strong>Assigned To:</strong> {task.assignedTo}</p>
                    <p className="mb-2"><strong>Role:</strong> {task.role}</p>
                <div className="flex flex-col gap-2">

                    <button
                      onClick={() => toggleEdit(index)}
                      className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded mb-2"
                      >
                      Edit Task
                    </button>
                    <button
                      onClick={() => deleteTask(task._id)}
                      className="w-full py-2 bg-red-600 hover:bg-red-700 text-white rounded mt-2"
                      >
                      Delete
                    </button>
                </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
         <button className="w-full py-2 bg-red-600 bover:bg-red-700 text-white rounded mt-2" onClick={handleLogout}>
             Logout
        </button>
      </div>
    </div>
  );
};

export default Task;
