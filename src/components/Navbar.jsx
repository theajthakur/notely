import React, { useState } from "react";
import { useMode } from "../Context/ModeContext";
import Modal from "../Context/Modal";
import SwalAlert from "../utils/SwalAlert";

export default function Navbar() {
  const { mode, toggleMode } = useMode();
  const [isModalOpen, setModalOpen] = useState(false);
  function exportBackup() {
    const diary = JSON.parse(localStorage.getItem("notely-diary") || "{}");
    const tasks = JSON.parse(localStorage.getItem("notely-tasks") || "{}");

    const data = { diary, tasks };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "notely-backup.json";
    a.click();

    URL.revokeObjectURL(url);
    SwalAlert({
      title: "Backup Exported",
      text: "Your diaries and tasks were exported.",
      icon: "success",
      showCancelButton: false,
      showConfirmButton: true,
      confirmButtonText: "OK",
    });
    setModalOpen(false);
    console.log("Backup exported successfully.");
    setModalOpen(false);
  }

  function importBackup(file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      try {
        const data = JSON.parse(e.target.result);
        if (data.diary)
          localStorage.setItem("notely-diary", JSON.stringify(data.diary));
        if (data.tasks)
          localStorage.setItem("notely-tasks", JSON.stringify(data.tasks));
        SwalAlert({
          title: "Backup Imported",
          text: "Your diaries and tasks were imported.",
          icon: "success",
          showCancelButton: false,
          showConfirmButton: true,
          confirmButtonText: "OK",
        });
        setModalOpen(false);
      } catch (err) {
        SwalAlert({
          title: "Backup Cannot be Imported",
          text: "Please check the file format.",
          icon: "error",
          showCancelButton: false,
          showConfirmButton: true,
          confirmButtonText: "OK",
        });
        console.error("Error importing backup:", err);
        setModalOpen(false);
      }
    };
    reader.readAsText(file);
  }
  function handleFileChange(event) {
    const file = event.target.files[0];
    if (file) {
      importBackup(file);
    }
  }
  function handleFileClick() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = handleFileChange;
    input.click();
  }
  return (
    <>
      <div className="my-navbar">
        <nav
          className={`navbar navbar-expand ${
            mode === "light" ? "navbar-light bg-light" : "navbar-dark bg-dark"
          }`}
        >
          <div className="container">
            <a
              className="navbar-brand"
              href="https://github.com/theajthakur"
              target="_blank"
            >
              Notely
            </a>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    05-05-2025
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    aria-current="page"
                    href="#"
                    onClick={toggleMode}
                  >
                    <span
                      className={mode === "light" ? "bi bi-moon" : "bi bi-sun"}
                    ></span>
                    {mode === "light" ? " Dark" : " Light"}
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="#"
                    onClick={() => setModalOpen(true)}
                  >
                    <span className="bi bi-gear"></span> Settings
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        title="Settings"
      >
        <div className="settings-container">
          <div className="settings-item">
            <p>Backup and Recovery</p>
            <div className="content">
              <button
                className="btn btn-success me-2"
                onClick={handleFileClick}
              >
                <span className="bi bi-upload"></span> Import Data
              </button>
              <button className="btn btn-primary" onClick={exportBackup}>
                <span className="bi bi-download"></span> Export Data
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
