import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router";

function TaskDetails() {
  const { state } = useLocation();
  const { id } = useParams();
  const [task, setTask] = useState(state?.task || null);

  useEffect(() => {
    if (!state?.task) {
      const saved = localStorage.getItem("tasks");
      if (saved) {
        const tasks = JSON.parse(saved);
        const found = tasks.find((task) => String(task.id) === String(id));
        if (found) setTask(found);
      }
    }
  }, [id, state]);

  const formatDate = (date) => {
    if (!date) return "";
    const dt = new Date(date);
    if (isNaN(dt)) return date;
    return dt.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (!task) {
    return (
      <div>
        <nav>
          <div className="w-full bg-blue-700 text-white">
            <div className="flex items-center justify-between p-4">
              <div className="font-bold text-lg px-4">
                <Link className="hover:underline" to="/">
                  Task App
                </Link>
              </div>
              <div className="font-bold text-l px-[400px] hover:underline">
                All Task
              </div>
            </div>
          </div>
        </nav>

        <div className="min-h-screen bg-gray-100 py-8">
          <div className="max-w-xl mx-auto px-4 text-center">
            <div className="font-bold text-[28px] mb-6">Task not found</div>
            <Link to="/all-tasks" className="text-blue-600 hover:underline">
              Back to tasks
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <nav>
        <div className="w-full bg-blue-700 text-white">
          <div className="flex items-center justify-between p-4">
            <div className="font-bold text-lg px-4">
              <Link className="hover:underline" to="/">
                Task App
              </Link>
            </div>
            <div className="font-bold text-l px-[400px] hover:underline">
              All Task
            </div>
          </div>
        </div>
      </nav>

      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-xl mx-auto px-4">
          <h1 className="text-center font-bold text-xl mb-4">{task.title}</h1>

          <div className="bg-amber-400 p-4 rounded-xl shadow">
            <div className="bg-white p-4 rounded text-sm">
              <div className="flex justify-between items-start mb-3">
                <div className="font-semibold">Details</div>
                <div className="text-xs text-gray-500 flex">
                  <div className="text-black font-bold px-2">Due Date:</div>
                  {formatDate(task.date)}
                </div>
              </div>

              <div className="text-gray-700 whitespace-pre-line">
                {task.details || "No description provided."}
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link
              to="/all-tasks"
              className="bg-blue-700 text-white rounded-lg px-10 py-3 w-full text-center font-semibold hover:bg-blue-800"
            >
              Back to tasks
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskDetails;
