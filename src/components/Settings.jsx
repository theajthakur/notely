import SwalAlert from "../utils/SwalAlert";
import React, { useState } from "react";
import bcrypt from "bcryptjs";
import "../Context/styles/Settings.css";
import Swal from "sweetalert2";

export default function Settings() {
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  function passwordToggle() {
    setPasswordShown(!passwordShown);
  }
  async function hashText(text) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(text, salt);
    return hash;
  }
  async function handlePasswordSet() {
    if (!password || password.length < 6 || password.length > 12) {
      SwalAlert({
        title: "Password Cannot be Set",
        text: "Password should be made up of combination of minimum 6 letters or digits & maximum 12 letters or digits.",
        icon: "error",
        showCancelButton: false,
        showConfirmButton: true,
        confirmButtonText: "OK",
      });
      return;
    }
    try {
      const hashedPass = await hashText(password);
      let savedPassOptions;
      try {
        JSON.parse(localStorage.getItem("notely-password"));
      } catch (error) {
        savedPassOptions = {};
      }
      if (!savedPassOptions?.password) {
        savedPassOptions = {};
      }
      savedPassOptions.password = hashedPass;
      localStorage.setItem("notely-password", JSON.stringify(savedPassOptions));
      SwalAlert({
        title: "Password Set",
        text: "Your password was set successfully.",
        icon: "success",
        showCancelButton: false,
        showConfirmButton: true,
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.log(error);
    }
  }
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
    <div className="settings-container">
      <div className="settings-item">
        <p>
          Backup and Recovery <span className="bi bi-database"></span>
        </p>
        <div className="content">
          <button className="btn btn-success me-2" onClick={handleFileClick}>
            <span className="bi bi-upload"></span> Import Data
          </button>
          <button className="btn btn-primary" onClick={exportBackup}>
            <span className="bi bi-download"></span> Export Data
          </button>
        </div>
      </div>
      <div className="settings-item mt-3 pt-3 border-top">
        <p>
          Password Protection <span className="bi bi-lock"></span>
        </p>
        <div className="content">
          <div className="password-input d-inline-flex w-100">
            <input
              className="w-100 px-2"
              type={passwordShown ? "text" : "password"}
              placeholder="Enter Password"
              value={password}
              onInput={(event) => setPassword(event.target.value)}
            />
            <button onClick={passwordToggle} className="pe-3 bg-transparent">
              <span
                className={passwordShown ? "bi bi-eye-slash" : "bi bi-eye"}
              ></span>
            </button>
            <button className="btn btn-primary" onClick={handlePasswordSet}>
              <span className="bi bi-lock"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
