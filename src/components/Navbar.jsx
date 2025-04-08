import React, { useState } from "react";
import { useMode } from "../Context/ModeContext";
import Modal from "../Context/Modal";
import Settings from "./Settings";

export default function Navbar() {
  const [isModalOpen, setModalOpen] = useState(false);
  const { mode, toggleMode } = useMode();
  return (
    <>
      <div className="my-navbar">
        <nav className={`navbar navbar-expand`}>
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
                    {mode === "light" ? " Night" : " Light"}
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
        <Settings />
      </Modal>
    </>
  );
}
