import React, { Component } from "react";
import Context from "./context";
import NavBar from "./Prayer/NavBar";
import Location from "./Prayer/Location";
import PrayerList from "./Prayer/PrayerList";

import { formatRelative, subDays } from "date-fns";
import { es, ru } from "date-fns/locale";

class App extends Component {
  static contextType = Context;

  componentDidMount() {
    this.updatePrayers(0);
  }

  changeCity = v => {
    this.updatePrayers(v.target.value);
  };

  updatePrayers = city => {
    if (!(city in this.context.cities)) city = 0;
    this.context.city = city;
    this.context.location = this.context.cities[city];

    fetch("https://nam.az/api/" + city)
      .then(response => response.json())
      .then(data => {
        const tmpPrayers = { ...this.context.prayers };

        for (let i = 0; i < 6; i++) {
          tmpPrayers[i]["time"] = data.prayers[i];
        }

        this.setState({});
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
          <NavBar changeCity={this.changeCity} cities={this.context.cities} />

          <div className="container">
            <Location location={this.context.location} />

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
