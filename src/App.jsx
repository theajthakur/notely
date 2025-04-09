import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import { useMode } from "./Context/ModeContext";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "animate.css";
import SwalAlert from "./utils/SwalAlert";
import Unlock from "./components/Unlock";
import Home from "./components/Home";
import PrivacyPolicy from "./components/Privacy";
import Terms from "./components/Terms";

export default function App() {
  const { mode } = useMode();
  const passwordSettings = JSON.parse(
    localStorage.getItem("notely-password") || "{}"
  );
  if (!passwordSettings?.password) {
    SwalAlert({
      title: "Password Not Set",
      text: "Please set a password to ensure your diary is secure.",
      icon: "warning",
      showCancelButton: false,
      showConfirmButton: true,
      confirmButtonText: "OK",
    });
  }
  if (passwordSettings?.password && passwordSettings?.password !== "") {
    const passDate = new Date(passwordSettings?.date) || 0;
    const hasExpired =
      passDate && passDate.getTime() < new Date().getTime() - 60 * 1000;
    if (!passDate || passDate == "Invalid Date" || hasExpired) {
      return <Unlock />;
    }
  }

  return (
    <>
      <div className={`app`}>
        <Navbar />
        <Routes>
          <Route path="/notely" element={<Home />} />
          <Route path="/notely/privacy" element={<PrivacyPolicy />} />
          <Route path="/notely/terms-conditions" element={<Terms />} />
        </Routes>
      </div>
    </>
  );
}
