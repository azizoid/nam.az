import React from "react";

function NavBar(props) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <a class="navbar-brand" href="/">
          <img
            src="https://nam.az/favicon.png"
            width="30"
            height="30"
            class="d-inline-block align-top"
            alt="Azərbaycan şəhərləri üzrə namaz vaxtı"
          />
          Nam.az
        </a>

        <div>
          <ul className="navbar-nav">
            <li className="nav-item active">
              <select
                className="form-control btn-outline-success"
                onChange={props.changeCity.bind(this)}
              >
                {props.cities.map((city, index) => {
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
}
export default NavBar;
