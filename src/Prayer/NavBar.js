import React from "react";

function NavBar(props) {

  changeCity(e): {
    props.updatePr(e.target.value)
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <a className="navbar-brand" href="/">
          Nam.az
        </a>

        <div>
          <ul className="navbar-nav">
            <li className="nav-item active">
              <select
                className="form-control btn-outline-success"
                onChange={props.updatePr}
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
