// SideBar.js
import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

function SideBar() {
  return (
    <div className="sidebar">
      <div className="sidetext">
        <Link to="/">Home</Link>
      </div>
      <hr className="sideline"></hr>
      <div className="sidetext">
        <Link to="/watchlist">Watchlist</Link>
      </div>
      <hr className="sideline"></hr>
      <div className="sidetext">
        <Link to="/for-you">For You</Link>
      </div>
      <hr className="sideline"></hr>
    </div>
  );
}

export default SideBar;
