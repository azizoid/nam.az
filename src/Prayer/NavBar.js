import React from "react";
import PropTypes from "prop-types";

const NavBar = ({ changeCity, cities, city }) => {
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
                onChange={(e) => changeCity(parseInt(e.target.value))}
                value={city}
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

NavBar.propTypes = {
  changeCity: PropTypes.func,
  cities: PropTypes.array,
  city: PropTypes.number,
};

export default NavBar;
