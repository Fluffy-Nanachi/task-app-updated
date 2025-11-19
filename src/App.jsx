import { useState, useEffect } from "react";
import { Link } from "react-router";

import "./App.css";

function App() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [details, setDetails] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) {
      setTasks(JSON.parse(saved));
    }
  }, []);

  const save = (next) => {
    localStorage.setItem("tasks", JSON.stringify(next));
    setTasks(next);
  };

  const addTask = (e) => {
    e.preventDefault();
    const missing = [];
    if (!title) missing.push("Title");
    if (!date) missing.push("Date");
    if (!details) missing.push("Details");
    if (missing.length) {
      alert("Please provide the following: " + missing.join(", "));
      return;
    }

    const newTask = { id: Date.now(), title, date, details };
    save([newTask, ...tasks]);
    setTitle("");
    setDate("");
    setDetails("");
  };
  return (
    <>
      <nav>
        <div className="w-full bg-blue-700 text-white">
          <div className="flex items-center justify-between p-4">
            <div className="font-bold text-lg px-4">Task App</div>
            <div>
              <Link
                className="font-bold text-l px-[400px] hover:underline"
                to="/all-tasks"
              >
                All Task
              </Link>
            </div>
          </div>
        </div>
      </nav>
      {/* the form */}
      <div className="min-h-screen bg-gray-100 flex items-start justify-center pt-12 pb-12">
        <div className="w-full max-w-md px-4">
          <div className="bg-amber-400 rounded-xl p-6 shadow-md">
            {/* added id so the submit button outside the form can target it */}
            <form id="taskform" onSubmit={addTask} className="space-y-4">
              <input
                type="text"
                placeholder="Task Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-white rounded-lg px-4 py-3 w-full shadow-inner placeholder-gray-500"
              />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="bg-white rounded-lg px-4 py-3 w-full shadow-inner text-gray-700"
              />
              <textarea
                placeholder="Details"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                className="bg-white rounded-lg px-4 py-3 w-full shadow-inner placeholder-gray-500"
              ></textarea>

              {/* the button */}
            </form>
          </div>
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              form="taskform"
              className="bg-blue-700 text-white rounded-lg px-10 py-3 w-full text-center font-semibold hover:bg-blue-800"
            >
              Add Task
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
