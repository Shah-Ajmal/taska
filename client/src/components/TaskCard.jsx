const TaskCard = ({ task, onEdit, onDelete }) => {
  const statusClass = {
    pending: "status-pending",
    "in-progress": "status-progress",
    done: "status-done",
  };

  return (
    <div className="task-card">
      <div className="task-top">
        <h4>{task.title}</h4>
        <span className={`status-badge ${statusClass[task.status]}`}>
          {task.status}
        </span>
      </div>
      {task.description && <p className="task-desc">{task.description}</p>}
      <div className="task-actions">
        <button onClick={() => onEdit(task)}>Edit</button>
        <button className="delete-btn" onClick={() => onDelete(task._id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
