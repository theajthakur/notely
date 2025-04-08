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
import SwalAlert from "./utils/SwalAlert";
import Unlock from "./components/Unlock";

export default function App() {
  const { mode } = useMode();
  const passwordSettings = JSON.parse(
    localStorage.getItem("notely-password") || "{}"
  );
  if (!passwordSettings?.password) {
    SwalAlert({
      title: "Password Not Set",
      text: "Please set a password to ensure your diary is secure.",
      icon: "warning",
      showCancelButton: false,
      showConfirmButton: true,
      confirmButtonText: "OK",
    });
  }
  if (passwordSettings?.password && passwordSettings?.password !== "") {
    const passDate = new Date(passwordSettings?.date) || 0;
    const hasExpired =
      passDate && passDate.getTime() < new Date().getTime() - 60 * 1000;
    if (!passDate || passDate == "Invalid Date" || hasExpired) {
      return <Unlock />;
    }
  }

  return (
    <Routes>
      <Route
        path="/notely"
        element={
          <div className={`app`}>
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
