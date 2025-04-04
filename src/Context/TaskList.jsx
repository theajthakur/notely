import React from "react";

export default function TaskList() {
  return (
    <div className="task-section">
      <ul>
        <li className="task-item">
          <input type="checkbox" />
          <span className="task-text">Task 1</span>
        </li>
        <li className="task-item">
          <input type="checkbox" />
          <span className="task-text">Task 2</span>
        </li>
      </ul>
    </div>
  );
}
