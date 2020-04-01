import React, { Component } from "react";
import NavBar from "./Layout/NavBar";
import Location from "./Prayer/Location";
import PrayerList from "./Prayer/PrayerList";
import Loader from "./Prayer/Loader";
import Ayah from "./Prayer/Ayah";

import { format, formatDistanceStrict, parse } from "date-fns";
import { az } from "date-fns/locale";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prayers: [
        { id: 1, title: "Fəcr namazı", time: "--:--" },
        { id: 2, title: "Günəş", time: "--:--" },
        { id: 3, title: "Zöhr namazı", time: "--:--" },
        { id: 4, title: "Əsr namazı", time: "--:--" },
        { id: 5, title: "Məğrib namazı", time: "--:--" },
        { id: 6, title: "İşa namazı", time: "--:--" }
      ],
      currentPrayer: 5,
      city: 1,
      location: "Bakı",
      cities: [
        "Bakı",
        "Ağdam",
        "Astara",
        "Gəncə",
        "Qazax",
        "Quba",
        "Lənkəran",
        "Saatlı",
        "Sabirabad",
        "Şamaxı",
        "Şəki",
        "Xaçmaz",
        "Yevlax",
        "Naxçıvan",
        "Göycay",
        "Zaqatala"
      ],
      loader: true,
      ayah: {
        s: 40,
        a: 60,
        c:
          "Rəbbiniz dedi: 'Mənə dua edin, Mən də sizə cavab verim. Həqiqətən, Mənə ibadət etməyə təkəbbür göstərənlər Cəhənnəmə zəlil olaraq girəcəklər'."
      }
    };
  }

  componentDidMount() {
    this.setState({ nowis: format(new Date(), "HH:mm") });
    this.updatePrayers(0);
    this.readAyah();
  }

  changeCity = v => {
    this.updatePrayers(v.target.value);
  };

  updatePrayers = city => {
    if (!(city in this.state.cities)) city = 0;
    this.setState({ city: city, location: this.state.cities[city] });

    fetch("https://nam.az/api/" + city)
      .then(response => response.json())
      .then(data => {
        const out = {};
        out.prayers = [...this.state.prayers];
        out.nowis = this.state.nowis;

        for (let i = 0; i < 6; i++) {
          out.prayers[i]["time"] = data.prayers[i];
          out.prayers[i]["ago"] = formatDistanceStrict(
            new Date(),
            parse(data.prayers[i], "HH:mm", new Date()),
            { locale: az, addSuffix: true }
          );
          if (data.prayers[i] < out.nowis) {
            out.currentPrayer = i;
          }
        }
        this.setState(out);
      });
  };

  readAyah = () => {
    fetch("https://quran.az/api/random/Namaz")
      .then(response => response.json())
      .then(data => {
        const out = {};
        out.ayah = data.out;
        out.loader = false;
        this.setState(out);
      });
  };

  render() {
    return (
      <div>
        <NavBar changeCity={this.changeCity} cities={this.state.cities} />

        <div className="container">
          <Location
            location={this.state.location}
            date={format(new Date(), "EEEE, d MMMM yyyy", { locale: az })}
          />

          <PrayerList
            prayers={this.state.prayers}
            currentPrayer={this.state.currentPrayer}
          />

          {this.state.loader === true ? (
            <Loader />
          ) : (
            <Ayah ayah={this.state.ayah} />
          )}
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
    );
  }
}

export default App;
