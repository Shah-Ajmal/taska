import { useState, useEffect } from "react";
import api from "../api/axios.js";
import { useAuth } from "../context/AuthContext.jsx";
import Navbar from "../components/Navbar.jsx";
import TaskCard from "../components/TaskCard.jsx";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "pending",
  });
  const [editingTask, setEditingTask] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      setError("Failed to load tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (editingTask) {
        await api.put(`/tasks/${editingTask._id}`, form);
        setEditingTask(null);
      } else {
        await api.post("/tasks", form);
      }
      setForm({ title: "", description: "", status: "pending" });
      fetchTasks();
    } catch (err) {
      setError("Failed to save task");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setForm({
      title: task.title,
      description: task.description,
      status: task.status,
    });
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      setError("Failed to delete task");
    }
  };

  const handleCancel = () => {
    setEditingTask(null);
    setForm({ title: "", description: "", status: "pending" });
  };

  return (
    <div className="tasks-wrapper">
      <Navbar />
      <div className="tasks-container">
        <div className="form-section">
          <h3>{editingTask ? "Edit task" : "New task"}</h3>
          {error && <p className="error">{error}</p>}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Task title"
              value={form.title}
              onChange={handleChange}
              required
            />
            <textarea
              name="description"
              placeholder="Description (optional)"
              value={form.description}
              onChange={handleChange}
              rows={3}
            />
            <select name="status" value={form.status} onChange={handleChange}>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
            <div className="form-actions">
              <button type="submit" disabled={loading}>
                {loading
                  ? "Saving..."
                  : editingTask
                    ? "Update task"
                    : "Add task"}
              </button>
              {editingTask && (
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="task-list">
          <h3>Your tasks</h3>
          {tasks.length === 0 ? (
            <p className="empty">No tasks yet. Add one above.</p>
          ) : (
            tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
