import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTask,
  deleteTask,
  editTask,
  selectCategoryById,
  selectAllTasks,
  selectCompletedTasks,
  selectCategories,
  selectTasksByCategory,
  setTaskCompleted,
  updateTaskProgress,
} from "../../daily challange.js";

export function TaskList({ selectedCategory }) {
  const dispatch = useDispatch();
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const category = useSelector((state) =>
    selectCategoryById(state, selectedCategory),
  );
  const tasks = useSelector((state) =>
    selectTasksByCategory(state, selectedCategory),
  );
  const completedCount = useSelector(selectCompletedTasks);
  const categories = useSelector(selectCategories);
  const allTasks = useSelector(selectAllTasks);
  const selectedLabel = category?.name ?? "All tasks";

  const resetForm = useCallback(() => {
    setEditingTaskId(null);
    setTaskTitle("");
    setTaskDescription("");
  }, []);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      const title = taskTitle.trim();
      if (!title) return;

      if (editingTaskId) {
        dispatch(
          editTask({
            id: editingTaskId,
            changes: { title, description: taskDescription.trim() },
          }),
        );
      } else {
        const categoryId =
          selectedCategory === "all"
            ? (categories[0]?.id ?? "")
            : selectedCategory;
        if (!categoryId) return;
        dispatch(
          addTask({
            id: `task-${crypto.randomUUID()}`,
            title,
            description: taskDescription.trim(),
            categoryId,
            progress: 0,
            completed: false,
          }),
        );
      }
      resetForm();
    },
    [
      categories,
      dispatch,
      editingTaskId,
      resetForm,
      selectedCategory,
      taskDescription,
      taskTitle,
    ],
  );

  const handleEditTask = useCallback((task) => {
    setEditingTaskId(task.id);
    setTaskTitle(task.title);
    setTaskDescription(task.description);
  }, []);

  const handleToggleCompleted = useCallback(
    (task) => {
      dispatch(
        setTaskCompleted({
          id: task.id,
          completed: !task.completed,
        }),
      );
    },
    [dispatch],
  );

  const handleProgressChange = useCallback(
    (taskId, progress) => {
      dispatch(updateTaskProgress({ id: taskId, progress }));
    },
    [dispatch],
  );

  const handleDeleteTask = useCallback(
    (taskId) => {
      dispatch(deleteTask(taskId));
      if (editingTaskId === taskId) resetForm();
    },
    [dispatch, editingTaskId, resetForm],
  );

  return (
    <section className="task-area" aria-labelledby="task-list-heading">
      <header className="task-header">
        <div>
          <p className="date-kicker">YOUR DAY, AT YOUR PACE</p>
          <h1 id="task-list-heading">{selectedLabel}</h1>
          <p className="task-summary">
            {completedCount} of{" "}
            {allTasks.length} tasks completed
          </p>
        </div>
        <div className="completion-ring" aria-label={`${completedCount} completed`}>
          <span>{completedCount}</span>
          <small>done</small>
        </div>
      </header>

      <form className="task-form" onSubmit={handleSubmit}>
        <div className="task-form-fields">
          <label className="visually-hidden" htmlFor="task-title">
            Task title
          </label>
          <input
            id="task-title"
            value={taskTitle}
            onChange={(event) => setTaskTitle(event.target.value)}
            placeholder="What needs to get done?"
            maxLength={100}
            required
          />
          <label className="visually-hidden" htmlFor="task-description">
            Task details
          </label>
          <input
            id="task-description"
            value={taskDescription}
            onChange={(event) => setTaskDescription(event.target.value)}
            placeholder="Add a little detail (optional)"
            maxLength={180}
          />
        </div>
        <div className="form-actions">
          {editingTaskId && (
            <button
              className="cancel-button"
              type="button"
              onClick={resetForm}
            >
              Cancel
            </button>
          )}
          <button className="primary-button" type="submit">
            {editingTaskId ? "Save task" : "Add task"}
          </button>
        </div>
      </form>
      {categories.length === 0 && !editingTaskId && (
        <p className="category-notice">
          Add a category before creating a task.
        </p>
      )}

      {tasks.length > 0 ? (
        <ul className="task-list">
          {tasks.map((task) => (
            <li
              className={`task-card${task.completed ? " is-complete" : ""}`}
              key={task.id}
            >
              <button
                type="button"
                className="complete-toggle"
                aria-label={
                  task.completed ? `Reopen ${task.title}` : `Complete ${task.title}`
                }
                aria-pressed={task.completed}
                onClick={() => handleToggleCompleted(task)}
              >
                {task.completed ? "✓" : ""}
              </button>
              <div className="task-content">
                <div className="task-title-row">
                  <div>
                    <h2>{task.title}</h2>
                    {task.description && <p>{task.description}</p>}
                  </div>
                  <span className="task-category">
                    {selectCategoryById(
                      { categories },
                      task.categoryId,
                    )?.name ?? "Uncategorized"}
                  </span>
                </div>
                <div className="progress-row">
                  <label htmlFor={`progress-${task.id}`}>Progress</label>
                  <input
                    id={`progress-${task.id}`}
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={task.progress}
                    aria-label={`${task.title} progress`}
                    onChange={(event) =>
                      handleProgressChange(task.id, Number(event.target.value))
                    }
                  />
                  <span>{task.progress}%</span>
                </div>
              </div>
              <div className="task-actions">
                <button
                  type="button"
                  className="text-action"
                  onClick={() => handleEditTask(task)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="text-action delete-action"
                  onClick={() => handleDeleteTask(task.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="empty-tasks">
          <span aria-hidden="true">✳</span>
          <h2>A little space to begin</h2>
          <p>Add a task above to get started in {selectedLabel.toLowerCase()}.</p>
        </div>
      )}
    </section>
  );
}
