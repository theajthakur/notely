import React from "react";
import "./styles/Diary.css";
import Modal from "./Modal";
import { useState } from "react";
import { useMode } from "./ModeContext";
export default function Diary() {
  const { mode } = useMode();
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedDiary, setSelectedDiary] = useState("");
  function saveDiaryEntry(event) {
    const today = new Date().toISOString().split("T")[0];
    const diaryData = JSON.parse(localStorage.getItem("notely-diary")) || {};
    diaryData[today] = event.target.value;
    localStorage.setItem("notely-diary", JSON.stringify(diaryData));
  }

  function openDiaryEntry(date) {
    const diaryData = JSON.parse(localStorage.getItem("notely-diary")) || {};
    setSelectedDiary(diaryData[date]);
    setModalOpen(true);
  }
  return (
    <div className="diary-section">
      <h1 className="diary-title">Diary</h1>
      <p className="diary-description">
        This is your personal diary. You can write your thoughts, feelings, and
        experiences here. Your diary is private and only you can see it.
      </p>
      <textarea
        rows="8"
        className={`diary-input form-control ${
          mode === "night" ? "bg-dark text-light" : ""
        }`}
        placeholder="Write your diary here..."
        onChange={saveDiaryEntry}
        defaultValue={
          JSON.parse(localStorage.getItem("notely-diary"))?.[
            new Date().toISOString().split("T")[0]
          ] || ""
        }
        style={{ resize: "none" }}
        autoCorrect="off"
        spellCheck="false"
      ></textarea>
      {Object.entries(JSON.parse(localStorage.getItem("notely-diary")) || {})
        .length <= 0 ? (
        ""
      ) : (
        <div className="diary-history mt-5 card">
          <div className="card-header">
            <h2 className="diary-history-title">Diary History</h2>
          </div>
          <div
            className={`card-body ${
              mode === "night" ? "bg-dark text-light" : ""
            }`}
          >
            <div className="diary-history-list">
              {Object.entries(
                JSON.parse(localStorage.getItem("notely-diary")) || {}
              )
                .reverse()
                .map(([date, entry]) => {
                  const x = new Date(date);
                  const dateFormatted = `${x.getDate()} ${x.toLocaleString(
                    "default",
                    { month: "long" }
                  )}`;
                  return (
                    <div key={date} className="diary-history-item">
                      <div className="inner-container">
                        <div className="diary-history-date">
                          {dateFormatted}
                        </div>
                        <div className="short-entry">
                          {entry.length > 200
                            ? entry.slice(0, 200) + "..."
                            : entry}
                        </div>
                        <div className="diary-history-actions">
                          {entry.length > 200 ? (
                            <div className="diary-history-full-entry">
                              <button
                                onClick={() => openDiaryEntry(date)}
                                className="diary-history-link btn btn-info mb-2"
                              >
                                <span className="bi bi-eye"></span>
                              </button>
                            </div>
                          ) : (
                            ""
                          )}
                          <div className="diary-history-delete">
                            <a
                              className="diary-history-delete btn btn-danger"
                              href="#"
                              onClick={() => {
                                const diaryData = JSON.parse(
                                  localStorage.getItem("notely-diary")
                                );
                                delete diaryData[date];
                                localStorage.setItem(
                                  "notely-diary",
                                  JSON.stringify(diaryData)
                                );
                                window.location.reload();
                              }}
                            >
                              <span className="bi bi-trash"></span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        title="Diary Entry"
      >
        {selectedDiary}
      </Modal>
    </div>
  );
}
