const statusStyles = {
  pending: "bg-yellow-100 text-yellow-800",
  "in-progress": "bg-sky-100 text-sky-800",
  done: "bg-emerald-100 text-emerald-800",
};

const TaskCard = ({ task, onEdit, onDelete }) => {
  return (
    <div className="bg-white dark:bg-zinc-800 rounded-xl p-5 shadow-sm border border-zinc-100 dark:border-zinc-700 mb-3">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-zinc-800 dark:text-zinc-100">
          {task.title}
        </h4>
        <span
          className={`text-xs px-3 py-1 rounded-full font-medium capitalize ${statusStyles[task.status]}`}
        >
          {task.status}
        </span>
      </div>
      {task.description && (
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-3 leading-relaxed">
          {task.description}
        </p>
      )}
      <div className="flex gap-2 mt-3">
        <button
          onClick={() => onEdit(task)}
          className="text-sm px-4 py-1.5 rounded-md border border-zinc-200 dark:border-zinc-600 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task._id)}
          className="text-sm px-4 py-1.5 rounded-md border border-red-200 text-red-500 hover:bg-red-50 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
