import React from "react";
import Diary from "../Context/Diary";
import TaskList from "../Context/TaskList";
import { Link } from "react-router-dom";
export default function Home() {
  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-8 my-3">
            <Diary />
          </div>
          <div className="col-md-4 my-3">
            <TaskList />
          </div>
        </div>
      </div>
      <div className="w-100 p-3 text-center mt-5 pt-5 border-top">
        <p className="m-0">
          <Link to={"/privacy"} className="me-3">
            Privacy Policy
          </Link>
          <Link to={"/terms-conditions"}>Terms & Conditions</Link>
        </p>
      </div>
    </>
  );
}
