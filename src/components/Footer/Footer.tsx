import React from "react";

export const Footer = ():JSX.Element => (
  <nav className="navbar ">
    <div className="container-fluid">
      <ul className="nav align-content-center">
        <li className="nav-item navbar-text active">
          &copy; {new Date().getFullYear()}
        </li>
        <li className="nav-item">
          <a className="nav-link" href="https://www.nam.az">Nam.az</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="https://www.quran.az" rel=" noopener noreferrer" target="_blank">Quran.az</a>
        </li>
      </ul>
    </div>
  </nav>
);
