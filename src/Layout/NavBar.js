import React from "react";

const NavBar = ({ changeCity, cities }) => {
  return (
    <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <a className="navbar-brand" href="/">
          <img
            src="/favicon.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="nam.az"
          />
          Nam.az
        </a>

        <div>
          <ul className="navbar-nav">
            <li className="nav-item active">
              <select
                className="form-control btn-outline-success"
                onChange={changeCity.bind(this)}
              >
                {cities.map((city, index) => {
                  return (
                    <option value={index} key={index}>
                      {city}
                    </option>
                  );
                })}
              </select>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default NavBar;
