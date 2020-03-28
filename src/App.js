import React, { Component } from "react";
import Context from "./context";
import NavBar from "./Prayer/NavBar";
import Location from "./Prayer/Location";
import PrayerList from "./Prayer/PrayerList";

import { format, formatDistanceStrict, parse } from "date-fns";
import { az } from "date-fns/locale";

class App extends Component {
  static contextType = Context;

  componentDidMount() {
    this.context.nowis = format(new Date(), "HH:mm");
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
        const tmpNowis = this.context.nowis;

        for (let i = 0; i < 6; i++) {
          let tmp = data.prayers[i];
          tmpPrayers[i]["time"] = tmp;
          tmpPrayers[i]["ago"] = formatDistanceStrict(
            new Date(),
            parse(data.prayers[i], "HH:mm", new Date()),
            { locale: az, addSuffix: true, roundingMethod: "round" }
          );
          if (tmp < tmpNowis) {
            this.context.currentPrayer = i;
          }
        }

        this.setState({});
        console.log(this.context);
      });
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
            <Location
              location={this.context.location}
              date={format(new Date(), "EEEE, d MMMM yyyy", { locale: az })}
            />

            <PrayerList
              prayers={this.context.prayers}
              currentPrayer={this.context.currentPrayer}
            />
          </div>
          <footer className="footer">
            <nav>
              <ol className="breadcrumb">
                <li className="breadcrumb-item active">&copy; 2020</li>
                <li className="breadcrumb-item">
                  <a href="https://www.nam.az">Nam.az</a>
                </li>
                <li className="breadcrumb-item">
                  <a href="https://www.quran.az">Quran.az</a>
                </li>
              </ol>
            </nav>
          </footer>
        </div>
      </Context.Provider>
    );
  }
}

export default App;
