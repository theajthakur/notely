import React from "react";
import "./styles/Modal.css";
export default function Modal({ isOpen, onClose, title = "", children }) {
  if (!isOpen) return null;
  return (
    <div className="myModal">
      <div className="row justify-content-center w-100">
        <div
          className={`col-11 col-sm-10 col-md-8 col-lg-6 col-xl-5 rounded-lg shadow-lg p-4 card`}
        >
          <div className="modal-header w-100 pb-2 mb-2 border-bottom">
            <h2 className="text-center m-0">{title}</h2>
            <button className="ms-auto btn" onClick={onClose}>
              ✕
            </button>
          </div>
          <div className="modal-description">{children}</div>
        </div>
      </div>
    </div>
  );
}
