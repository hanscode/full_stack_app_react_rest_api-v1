import React from "react";
import { Link } from "react-router-dom";

import Nav from "./Nav";

/**
 * Displays the top menu bar for the application.
 * 
 * @returns Header Component.
 */
const Header = () => {
  return (
    <header>
      <div className="wrap header--flex">
        <h1 className="header--logo"><Link to="/">Courses</Link></h1>
        <Nav />
      </div>
    </header>
  );
};

export default Header;
