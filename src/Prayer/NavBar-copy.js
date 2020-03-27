import React, { Component } from "react";
import Context from "../context";

class NavBar extends Component {
  static contextType = Context;

  render() {
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
                  // onChange={v => this.context.updatePrayers(v.target.value)}
                  onChange={e => this.props.updatePr}
                >
                  {this.context.cities.map((city, index) => {
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
}
export default NavBar;
