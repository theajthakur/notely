import React from "react";
import { Link } from "react-router-dom";

export default function Terms() {
  return (
    <div class="container my-5">
      <div className="myHeader d-inline-flex w-100 mb-5 border-bottom pb-5">
        <div className="backkBtn">
          <Link to={"/notely/"} className="btn btn-primary">
            <span className="bi bi-arrow-left"></span>
          </Link>
        </div>
        <div className="titleBar w-100 text-center">
          <h2 className="m-0">Terms and Conditions</h2>
        </div>
      </div>

      <p class="mb-3">
        By using Notely, you agree to the following terms and conditions. Please
        read them carefully.
      </p>

      <h4 class="mt-4 mb-2">1. Personal Use Only</h4>
      <p class="mb-3">
        Notely is intended for personal use to manage daily diaries and tasks.
        You are responsible for how you use this app.
      </p>

      <h4 class="mt-4 mb-2">2. Local Storage of Data</h4>
      <p class="mb-3">
        All your data is stored locally in your browser. We do not have access
        to it and we do not back it up online.
      </p>

      <h4 class="mt-4 mb-2">3. No Liability</h4>
      <p class="mb-3">
        We are not responsible for any loss of data, damage, or issues caused by
        misuse of the app, browser storage errors, or device-related problems.
      </p>

      <h4 class="mt-4 mb-2">4. Password Responsibility</h4>
      <p class="mb-3">
        If you set a password, it is securely hashed using bcrypt and saved in
        local storage. You are responsible for remembering it, as we cannot
        recover or reset your password.
      </p>

      <h4 class="mt-4 mb-2">5. Backup and Restore</h4>
      <p class="mb-3">
        You are responsible for exporting and securely storing backup files. The
        app provides tools to help you import/export your data manually.
      </p>

      <h4 class="mt-4 mb-2">6. No Support for Cloud or Sync</h4>
      <p class="mb-3">
        Notely does not offer cloud syncing or online storage. Any future
        updates will still focus on keeping your data private and offline.
      </p>

      <h4 class="mt-4 mb-2">7. Modifications</h4>
      <p class="mb-3">
        We may update these terms at any time. It is your responsibility to
        review the terms periodically if updates are made.
      </p>

      <p class="mt-5 mb-0">
        By continuing to use Notely, you acknowledge that you have read,
        understood, and agreed to these terms.
      </p>
    </div>
  );
}
