import React from "react";

export const Footer = ():JSX.Element => (
  <nav className="navbar fixed-bottom ">
  <div className="container">
  <ol className='breadcrumb justify-content-center'>
      <li className="breadcrumb-item active" aria-current="page">&copy; {new Date().getFullYear()}</li>
      <li className="breadcrumb-item"><a href="https://www.nam.az">Nam.az</a></li>
      <li className="breadcrumb-item"><a href="https://www.quran.az" rel=" noopener noreferrer" target="_blank">Quran.az</a></li>
    </ol>
  </div>
</nav>
  
);
