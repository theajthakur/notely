import React from "react";
import { Link } from "react-router-dom";

export default function PrivacyPolicy() {
  return (
    <div className="container my-5">
      <div className="myHeader d-inline-flex w-100 mb-5 border-bottom pb-5">
        <div className="backkBtn">
          <Link to={"/notely/"} className="btn btn-primary">
            <span className="bi bi-arrow-left"></span>
          </Link>
        </div>
        <div className="titleBar w-100 text-center">
          <h2 className="m-0">Privacy Policy</h2>
        </div>
      </div>

      <p className="mb-3">
        Your privacy is important to us. Notely is designed with your privacy in
        mind — all your data stays on your device only.
      </p>

      <h4 className="mt-4 mb-2">1. No Account Needed</h4>
      <p className="mb-3">
        You don’t need to create an account or provide any personal information
        to use Notely.
      </p>

      <h4 className="mt-4 mb-2">2. No Cloud Storage</h4>
      <p className="mb-3">
        All your diary entries, tasks, and settings are stored securely in your
        browser’s local storage. We never upload or sync your data to any
        server.
      </p>

      <h4 className="mt-4 mb-2">3. No Tracking</h4>
      <p className="mb-3">
        We don’t track you, use analytics, or collect any usage data. Your usage
        stays private.
      </p>

      <h4 className="mt-4 mb-2">4. Password Protection</h4>
      <p className="mb-3">
        If you choose to set a password, it is securely hashed using{" "}
        <strong>bcrypt</strong> and saved in your local storage. We never store
        or transmit your actual password anywhere.
      </p>

      <h4 className="mt-4 mb-2">5. Optional Backup</h4>
      <p className="mb-3">
        You can export your data manually as a JSON backup file. This file is
        saved on your device only and is never uploaded automatically.
      </p>

      <h4 className="mt-4 mb-2">6. Full Control</h4>
      <p className="mb-3">
        You can edit, delete, or back up your data anytime. Everything is under
        your control.
      </p>

      <h4 className="mt-4 mb-2">7. Data Security</h4>
      <p className="mb-3">
        As all data is stored locally, we rely on your browser’s storage for
        security. For best protection, use your own trusted device.
      </p>

      <p className="mt-5 mb-0">
        If you have any questions, feel free to contact the developer. Your
        privacy and trust mean everything to us.
      </p>
    </div>
  );
}
