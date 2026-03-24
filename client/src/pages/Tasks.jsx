import { useState, useEffect } from "react";
import api from "../api/axios.js";
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

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

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
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 py-8 flex flex-col gap-8">
        <div className="bg-white dark:bg-zinc-800 rounded-2xl p-6 shadow-sm border border-zinc-100 dark:border-zinc-700">
          <h3 className="text-base font-semibold text-zinc-800 dark:text-zinc-100 mb-4">
            {editingTask ? "Edit task" : "New task"}
          </h3>
          {error && (
            <div className="bg-red-50 text-red-600 text-sm px-4 py-2 rounded-lg mb-4">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              type="text"
              name="title"
              placeholder="Task title"
              value={form.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-zinc-700 text-zinc-800 dark:text-zinc-100 text-sm outline-none focus:border-emerald-500 transition"
            />
            <textarea
              name="description"
              placeholder="Description (optional)"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-zinc-700 text-zinc-800 dark:text-zinc-100 text-sm outline-none focus:border-emerald-500 transition resize-none"
            />
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-zinc-700 text-zinc-800 dark:text-zinc-100 text-sm outline-none focus:border-emerald-500 transition"
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition disabled:opacity-60"
              >
                {loading
                  ? "Saving..."
                  : editingTask
                    ? "Update task"
                    : "Add task"}
              </button>
              {editingTask && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-5 py-2.5 rounded-lg text-sm border border-zinc-200 dark:border-zinc-600 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div>
          <h3 className="text-base font-semibold text-zinc-800 dark:text-zinc-100 mb-4">
            Your tasks
          </h3>
          {tasks.length === 0 ? (
            <p className="text-sm text-zinc-400">
              No tasks yet. Add one above.
            </p>
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
