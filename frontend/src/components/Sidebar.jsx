// SideBar.js
import React from "react";
import { Link } from "react-router-dom";

function SideBar() {
  return (
    <div className='sidebar'>
      <div style={{ paddingBottom: "10px" }}>
        <Link to='/'>Home</Link>
      </div>
      <div>
        <Link to='/watchlist'>Watchlist</Link>
      </div>
      <div>
        <Link to='/for-you'>For You</Link>
      </div>
    </div>
  );
}

export default SideBar;
