import React from "react";

export default function Diary() {
  function saveDiaryEntry(event) {
    const today = new Date().toISOString().split("T")[0];
    // Get the current date in YYYY-MM-DD format

    const diaryData = JSON.parse(localStorage.getItem("notely-diary")) || {};

    diaryData[today] = event.target.value;
    // Save the updated diary data to localStorage

    localStorage.setItem("notely-diary", JSON.stringify(diaryData));
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
        className="diary-input form-control"
        placeholder="Write your diary here..."
        onChange={saveDiaryEntry}
        defaultValue={
          JSON.parse(localStorage.getItem("notely-diary"))[
            new Date().toISOString().split("T")[0]
          ] || ""
        }
        style={{ resize: "none" }}
        autoCorrect="off"
        spellCheck="false"
      ></textarea>
      <div className="diary-history mt-5">
        <h2 className="diary-history-title">Diary History</h2>
        <ul className="diary-history-list">
          {Object.entries(
            JSON.parse(localStorage.getItem("notely-diary")) || {}
          )
            .reverse()
            .map(([date, entry]) => (
              <li key={date} className="diary-history-item mb-3">
                <strong>{date}</strong>:{" "}
                {entry.length > 200 ? entry.slice(0, 200) + "..." : entry}
                <div className="diary-history-actions">
                  {entry.length > 200 ? (
                    <a
                      href={`/notely/diary/${date}`}
                      className="diary-history-link me-3"
                    >
                      View Full Entry
                    </a>
                  ) : (
                    ""
                  )}
                  <a
                    className="diary-history-delete"
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
                    Delete Entry
                  </a>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
