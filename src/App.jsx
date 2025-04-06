import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import { useMode } from "./Context/ModeContext";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "animate.css";
import Diary from "./Context/Diary";
import TaskList from "./Context/TaskList";

export default function App() {
  const { mode } = useMode();
  return (
    <Routes>
      <Route
        path="/notely"
        element={
          <div
            className={`app ${mode === "light" ? "light-mode" : "dark-mode"}`}
          >
            <Navbar />
            <div className="container mt-5">
              <div className="row">
                <div className="col-md-8 my-3">
                  <Diary />
                </div>
                <div className="col-md-4 my-3">
                  <TaskList />
                </div>
              </div>
            </div>
          </div>
        }
      />
    </Routes>
  );
}
