import React, { useState } from "react";
import SwalAlert from "../utils/SwalAlert";
import bcrypt from "bcryptjs";
document.documentElement.setAttribute("data-bs-theme", "light");
export default function Unlock() {
  const [password, setPassword] = useState("");
  async function verifyText(text, hash) {
    const isMatch = await bcrypt.compare(text, hash);
    return isMatch;
  }
  const validatePassword = async () => {
    const realPass = JSON.parse(
      localStorage.getItem("notely-password") || "{}"
    );
    const isVerified = await verifyText(password, realPass.password);
    console.log(isVerified);
    if (!isVerified) {
      SwalAlert({
        title: "Invalid Password",
        text: "Your password is wrong, Please try again!.",
        icon: "error",
        showCancelButton: false,
        showConfirmButton: true,
        confirmButtonText: "OK",
      });
    } else {
      realPass.date = new Date();
      localStorage.setItem("notely-password", JSON.stringify(realPass));
      return window.location.reload();
    }
  };
  return (
    <div className="app">
      <div className="container mt-5">
        <div className="vh-100 d-flex justify-content-center align-items-center">
          <div className="col-sm-8 col-md-6 col-lg-5 col-xl-4 card">
            <div className="inner card shadow-sm p-4 rounded">
              <h3 className="text-center mb-4">
                <span className="bi bi-key"></span>
              </h3>
              <div className="password-field">
                <input
                  className="form-control"
                  value={password}
                  onInput={(event) => setPassword(event.target.value)}
                  type="password"
                  placeholder="Enter Your Password"
                />
                {password ? (
                  <button
                    className="btn btn-primary w-100 mt-3"
                    onClick={validatePassword}
                  >
                    <span className="bi bi-lock"></span>Unlock
                  </button>
                ) : (
                  <p className="mt-3 mb-2 text-center text-danger lead">
                    Please enter your password
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
