import React, { useState, useEffect } from "react";

const TodoApp = () => {
  // State to hold the list of tasks, initializing from local storage if available
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  // State to hold the current input value for a new task
  const [task, setTask] = useState("");

  // Effect to save tasks to local storage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Function to add a new task to the list
  const addTask = () => {
    if (task.trim() !== "") {
      setTasks([...tasks, { text: task, completed: false, id: Date.now() }]);
      setTask(""); // Clear the input after adding
    }
  };

  // Function to toggle the completion status of a task
  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Function to delete a task from the list
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-[700px]">
        <h1 className="text-2xl font-bold mb-4">TODO LIST</h1>
        <div className="flex mb-4">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="border border-sky-500 p-2 rounded w-full outline-none"
            placeholder="Add a new task"
          />
          <button
            onClick={addTask}
            className="bg-blue-500 text-white px-4 rounded ml-2"
          >
            Add
          </button>
        </div>
        <ul>
          {tasks.map((task) => (
            <li
              key={task.id}
              className={`flex items-center justify-between p-2 mb-2 border rounded ${
                task.completed ? "bg-gray-200" : "bg-blue-100"
              }`}
            >
              <div className="flex items-center">
                <div
                  className={`w-6 h-6 rounded-full border-2 border-gray-400 flex items-center justify-center cursor-pointer mr-2 ${
                    task.completed ? "bg-blue-500" : ""
                  }`}
                  onClick={() => toggleTaskCompletion(task.id)}
                >
                  {task.completed && (
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  )}
                </div>
                <span
                  className={`flex-1 ${task.completed ? "line-through" : ""}`}
                  onClick={() => toggleTaskCompletion(task.id)}
                >
                  {task.text}
                </span>
              </div>
              <button
                onClick={() => deleteTask(task.id)}
                className="bg-red-500 text-white px-2 py-1  rounded ml-2"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoApp;
