import React, { useEffect, useState } from "react";
// use react-router-dom
import { Link, Outlet, useNavigate } from "react-router";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDate, setEditDate] = useState("");
  const [editDesc, setEditDesc] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) {
      setTasks(JSON.parse(saved));
    }
  }, []);

  const persist = (next) => {
    localStorage.setItem("tasks", JSON.stringify(next));
    setTasks(next);
  };

  const deleteTask = (id) => {
    if (!confirm("Are you sure you want to delete this task?")) return;
    const next = tasks.filter((task) => task.id !== id);
    persist(next);
    if (editingId === id) setEditingId(null);
  };
  const startEdit = (task) => {
    setEditingId(task.id);
    setEditTitle(task.title || "");
    setEditDate(task.date || "");
    setEditDesc(task.description || "");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
    setEditDate("");
  };

  const saveEdit = (id) => {
    const missing = [];
    if (!editTitle) missing.push("Title");
    if (!editDate) missing.push("Date");
    if (missing.length) {
      alert("Please provide the following: " + missing.join(", "));
      return;
    }
    const next = tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          title: editTitle,
          date: editDate,
          description: editDesc,
        };
      }
      return task;
    });
    persist(next);
    cancelEdit();
  };
  return (
    // constrained centered container so cards are not full-width
    <div>
      <nav>
        <div className="w-full bg-blue-700 text-white">
          <div className="flex items-center justify-between p-4">
            <div className="font-bold text-lg px-4">
              <Link className="hover:underline" to="/">
                Task App
              </Link>
            </div>
            <div className="font-bold text-l px-[400px]">All Task</div>
          </div>
        </div>
      </nav>
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-xl mx-auto px-4">
          <div className="font-bold text-[28px] text-center mb-6 mt-6">
            Task List
          </div>

          <div className="bg-amber-400 p-4 rounded-xl shadow">
            {tasks.length === 0 ? (
              <p className="text-gray-700 text-center py-8">No Tasks yet</p>
            ) : (
              tasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-white rounded-lg px-4 py-3 mb-3 flex items-start shadow-sm"
                >
                  <div className="flex-1">
                    {editingId === task.id ? (
                      <div className="space-y-2">
                        <input
                          className="w-full px-3 py-2 border rounded text-sm"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          placeholder="Title"
                        />
                        <input
                          className="w-full px-3 py-2 border rounded text-sm"
                          value={editDate}
                          onChange={(e) => setEditDate(e.target.value)}
                          type="date"
                          placeholder="Date"
                        />
                        <textarea
                          className="w-full px-3 py-2 border rounded text-sm"
                          value={editDesc}
                          onChange={(e) => setEditDesc(e.target.value)}
                          placeholder="Description"
                        />

                        <div className="flex gap-3 justify-end">
                          <button
                            onClick={() => saveEdit(task.id)}
                            className="text-green-600 text-sm"
                          >
                            Save
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="text-gray-600 text-sm"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full flex items-center justify-between">
                        <Link
                          to={`/all-tasks/${task.id}`}
                          state={{ task }}
                          className="font-semibold text-sm text-blue-700 cursor-pointer hover:underline"
                        >
                          {task.title}
                        </Link>
                        <div className=" flex text-xs text-gray-500 ml-4">
                          <p className="text-black font-bold px-2">Due Date:</p>
                          {task.date}
                        </div>
                      </div>
                    )}
                  </div>

                  {editingId !== task.id && (
                    <div className="flex  items-end ml-4 gap-4">
                      <button
                        onClick={() => startEdit(task)}
                        className="text-blue-600 text-sm cursor-pointer hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="text-red-600 text-sm cursor-pointer hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
          <div className="mt-7 text-center">
            <Link
              to="/"
              className="bg-blue-700 text-white rounded-lg px-10 py-3 w-full text-center font-semibold hover:bg-blue-800"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default Tasks;
