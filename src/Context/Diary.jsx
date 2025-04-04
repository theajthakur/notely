import React from "react";

export default function Diary() {
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
      ></textarea>
    </div>
  );
}
