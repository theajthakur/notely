import React, { useState } from "react";
import "./styles/TaskList.css";

export default function TaskList() {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState(
    JSON.parse(localStorage.getItem("notely-tasks")) || {}
  );
  function addTaskToDate(today) {
    const taskData = JSON.parse(localStorage.getItem("notely-tasks")) || {};
    if (!taskData[today]) taskData[today] = [];

    taskData[today].push({
      id: taskData[today].length + 1,
      name: task,
      completed: false,
    });

    setTask("");
    setTaskList({ ...taskData });

    localStorage.setItem("notely-tasks", JSON.stringify(taskData));
  }

  return (
    <div className="task-section">
      <h1 className="task-title">Task List</h1>
      <p className="task-description">
        This is your task list. You can add, remove, and check off tasks as you
        complete them.
      </p>
      <div className="task-input mb-3">
        <input
          type="text"
          className="task-input-field form-control"
          placeholder="Add a new task..."
          value={task}
          onChange={(event) => setTask(event.target.value)}
        />
        <button
          className="task-add-button btn btn-primary"
          onClick={() => {
            addTaskToDate(date);
          }}
        >
          Add Task
        </button>
      </div>
      <div className="task-date mb-3">
        <input
          type="date"
          className="form-control"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <h2 className="task-list-title">Your Tasks</h2>
      <div className="task-list">
        {Object.entries(taskList).map(([key, value]) => (
          <div className="date-unit mb-3" data-date={key} key={key}>
            <h5>{key}</h5>
            <div className="task-list-items">
              {value.map((task) => {
                return (
                  <div key={task.id} className="task-item">
                    <div className="task-checkbox">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => {
                          task.completed = !task.completed;
                          setTaskList({ ...taskList });
                          localStorage.setItem(
                            "notely-tasks",
                            JSON.stringify(taskList)
                          );
                        }}
                      />
                    </div>
                    <div className="task-name">{task.name}</div>
                    <div className="task-actions">
                      <a
                        href="#"
                        className="task-delete-button"
                        onClick={() => {
                          const updatedTasks = value.filter(
                            (t) => t.id !== task.id
                          );
                          taskList[key] = updatedTasks;
                          setTaskList({ ...taskList });
                          localStorage.setItem(
                            "notely-tasks",
                            JSON.stringify(taskList)
                          );
                        }}
                      >
                        Delete
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
