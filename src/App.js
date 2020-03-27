import React, { Component } from "react";
import Context from "./context";
import Location from "./Prayer/Location";
import PrayerList from "./Prayer/PrayerList";

class App extends Component {
  static contextType = Context;

  componentDidMount() {
    this.updatePrayers(2);
  }

  changeCity = v => {
    this.updatePrayers(v.target.value);
  };

  updatePrayers = city => {
    if (!(city in this.context.cities)) city = 0;
    this.context.city = city;

    fetch("https://nam.az/api/" + city)
      .then(response => response.json())
      .then(data => {
        const tmpPrayers = [...this.context.prayers];
        console.log(tmpPrayers);

        for (let i = 0; i < 6; i++) {
          tmpPrayers[i]["time"] = data.prayers[i];
        }

        // this.setState(tmpPrayers => {
        //   return {
        //     prayers: tmpPrayers,
        //     location: "asdasd"
        //   };
        // });
        this.setState({});

        // this.setState({});
        console.log(this.context);
        //console.log(this.context.city);
        //console.log(this.context);
      });

    console.log(this.context.cities[city]);
    console.log("all context", this.context);
  };

  render() {
    return (
      <Context.Provider
        value={{
          prayers: this.context.prayers,
          cities: this.context.cities,
          location: this.context.location,
          currentPrayer: this.context.currentPrayer,
          updatePrayers: this.updatePrayers
        }}
      >
        <div>
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
                      onChange={this.changeCity}
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

          <div className="container">
            <Location location={this.context.cities[this.context.city]} />

            <PrayerList
              prayers={this.context.prayers}
              currentPrayer={this.context.currentPrayer}
            />
          </div>
        </div>
      </Context.Provider>
    );
  }
}

export default App;
