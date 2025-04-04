import React from "react";

export default function DateTime() {
  return (
    <div className="datetime-section">
      <div className="container bg-light">
        <p>
          {(x) => {
            const date = new Date();
            const options = {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            };
            return date.toLocaleDateString(undefined, options);
          }}
        </p>
      </div>
    </div>
  );
}
