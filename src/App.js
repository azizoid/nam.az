import React, { useState, useEffect } from "react";

import NavBar from "./Prayer/NavBar";
import Location from "./Prayer/Location";
import Progress from "./Prayer/Progress";
import PrayerList from "./Prayer/PrayerList";
import Loader from "./Prayer/Loader";
import Ayah from "./Prayer/Ayah";

import {
  format,
  formatDistanceStrict,
  parse,
  differenceInSeconds,
} from "date-fns";
import { az } from "date-fns/locale";

const App = () => {
  const cities = [
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
    "Zaqatala",
  ];
  const [prayers, setPrayers] = useState([
    { id: 1, title: "Fəcr namazı", time: "--:--" },
    { id: 2, title: "Günəş", time: "-:-" },
    { id: 3, title: "Zöhr namazı", time: "--:--" },
    { id: 4, title: "Əsr namazı", time: "--:--" },
    { id: 5, title: "Məğrib namazı", time: "--:--" },
    { id: 6, title: "İşa namazı", time: "--:--" },
  ]);
  const [pref, setPref] = useState({
    location: "Bakı",
    currentPrayer: -1,
    nowis: format(new Date(), "HH:mm"),
  });
  const [ayah, setAyah] = useState({
    loader: true,
    content: {
      s: 40,
      a: 60,
      c:
        "Rəbbiniz dedi: 'Mənə dua edin, Mən də sizə cavab verim. Həqiqətən, Mənə ibadət etməyə təkəbbür göstərənlər Cəhənnəmə zəlil olaraq girəcəklər'.",
    },
  });
  const [city, setCity] = useState(0);

  const changeCity = (v) => {
    if (!(v in cities)) v = 0;

    localStorage.setItem("city", v);

    setPref((prev) => {
      return { ...prev, location: cities[v] };
    });
    setCity(parseInt(v));
  };

  const per = (curr, prayers, nowis) => {
    const tmpDate = new Date();
    const untillNow = differenceInSeconds(
      parse(nowis, "HH:mm", tmpDate),
      parse(prayers[curr], "HH:mm", tmpDate)
    );

    const next = curr === 5 ? 0 : curr + 1;
    const untillNext = differenceInSeconds(
      parse(prayers[next], "HH:mm", tmpDate),
      parse(prayers[curr], "HH:mm", tmpDate)
    );
    return Math.abs(Math.floor((untillNow * 100) / untillNext));
  };

  useEffect(() => {
    fetch("https://quran.az/api/random/1/Namaz")
      .then((response) => response.json())
      .then((data) => {
        setAyah({ content: data.out[0], loader: false });
      });
  }, []);

  useEffect(() => {}, [city]);

  useEffect(() => {
    fetch("https://nam.az/api/" + city)
      .then((response) => response.json())
      .then((data) => {
        let currentPrayer = 5;
        const tmpPrayers = [...prayers];
        const nowis = pref.nowis;
        for (let i = 0; i < 6; i++) {
          tmpPrayers[i]["time"] = data.prayers[i];
          tmpPrayers[i]["ago"] = formatDistanceStrict(
            new Date(),
            parse(data.prayers[i], "HH:mm", new Date()),
            { locale: az, addSuffix: true }
          );
          if (data.prayers[i] < nowis) {
            currentPrayer = i;
          }
        }

        setPrayers([...tmpPrayers]);

        const progress = per(currentPrayer, data.prayers, nowis);

        setPref((prev) => {
          return {
            ...prev,
            progress: progress,
            currentPrayer: currentPrayer,
            location: cities[city],
          };
        });
      });

    let tmpCity = localStorage.getItem("city");
    if (tmpCity) setCity(tmpCity);
    else tmpCity = city;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city]);

  return (
    <div>
      <NavBar changeCity={changeCity} cities={cities} city={city} />

      <div className="container">
        <Location
          location={pref.location}
          date={format(new Date(), "EEEE, d MMMM yyyy", { locale: az })}
        />

        <Progress bar={pref.progress} />

        <PrayerList prayers={prayers} currentPrayer={pref.currentPrayer} />

        {ayah.loader === true ? <Loader /> : <Ayah ayah={ayah.content} />}
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
};

export default App;
