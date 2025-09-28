import React from "react";

const Navbar = ({  }) => {
  return (
    <nav className="navbar navbar-expand-lg bg-light shadow-md">
      <div className="container-fluid">
        <a className="navbar-brand font-bold text-xl" href="#">Task Manager</a>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" href="/task">Tasks</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/login">Logout</a>
            </li>
          </ul>
        </div>
        
        </div>
    </nav>
  );
};

export default Navbar;
