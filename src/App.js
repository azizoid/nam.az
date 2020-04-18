import React, { useState, useEffect } from "react";

import NavBar from "./Prayer/NavBar";
import Location from "./Prayer/Location";
import Progress from "./Prayer/Progress";
import PrayerList from "./Prayer/PrayerList";
import PrayerListStill from "./Prayer/PrayerListStill";
import Loader from "./Prayer/Loader";
import Ayah from "./Prayer/Ayah";

import {
  format,
  formatDistanceStrict,
  parse,
  differenceInSeconds,
  getDayOfYear,
} from "date-fns";
import { az } from "date-fns/locale";

const App = () => {
  const cities = [
    ,
    "Bakı",
    "Sumqayıt",
    "Gəncə",
    "Lənkaran",
    "Mingəçevir",
    "Naxçıvan",
    "Ağdam",
    "Astara",
    "Beyləqan",
    "Cəlilabad",
    "Göyçay",
    "Qəbələ",
    "Qazax",
    "Quba",
    "Qusar",
    "Saatlı",
    "Sabirabad",
    "Şamaxı",
    "Şəki",
    "Şirvan",
    "Xaçmaz",
    "Yevlax",
    "Zaqatala",
    "Xankəndi",
    // "Marneuli",
    // "Ərdəbil",
    // "Bolnisi",
  ];

  const [prayers, setPrayers] = useState([
    { id: 1, title: "Fəcr namazı", time: "--:--", rakat: 2 },
    { id: 2, title: "Günəş", time: "-:-", rakat: 0 },
    { id: 3, title: "Zöhr namazı", time: "-:-", rakat: 4 },
    { id: 4, title: "Əsr namazı", time: "-:-", rakat: 4 },
    { id: 5, title: "Məğrib namazı", time: "-:-", rakat: 3 },
    { id: 6, title: "İşa namazı", time: "-:-", rakat: 4 },
  ]);
  const [pref, setPref] = useState({
    location: "Bakı",
    currentPrayer: -1,
    nowis: format(new Date(), "HH:mm"),
    tarix: format(new Date(), "EEEE, d MMMM yyyy", { locale: az }),
    today: getDayOfYear(new Date()),
    prayerLoader: 1,
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
  const [city, setCity] = useState(parseInt(localStorage.getItem("city")) || 1);
  const [dd, setDd] = useState(parseInt(pref.today));

  const per = (curr, prayers, nowis) => {
    const tmpDate = new Date();
    const untillNow = differenceInSeconds(
      parse(nowis, "HH:mm", tmpDate),
      parse(prayers[curr], "HH:mm", tmpDate)
    );

    // const next = curr === 5 ? 0 : curr + 1;
    let untillNext;
    if (curr === 5) {
      untillNext = differenceInSeconds(
        parse("23:59", "HH:mm", tmpDate),
        parse(prayers[curr], "HH:mm", tmpDate)
      );
    } else {
      untillNext = differenceInSeconds(
        parse(prayers[curr++], "HH:mm", tmpDate),
        parse(prayers[curr], "HH:mm", tmpDate)
      );
    }

    return Math.abs(Math.floor((untillNow * 100) / untillNext));
  };

  const changeCity = (v) => {
    if (!(v in cities)) v = 0;

    localStorage.setItem("city", parseInt(v));

    setPref((prev) => {
      return { ...prev, location: cities[v] };
    });
    setCity(parseInt(v));
  };

  const changeDd = (v) => {
    setPref((prev) => {
      return { ...prev, tarix: prev.tarix };
    });
    setDd(parseInt(v));
  };

  useEffect(() => {
    fetch("https://quran.az/api/random/1/Namaz")
      .then((response) => response.json())
      .then((data) => {
        setAyah({ content: data.out[0], loader: false });
      });

    let tmpCity = parseInt(localStorage.getItem("city"));
    if (tmpCity) {
      setCity(tmpCity);
    }
  }, []);

  useEffect(() => {
    let url = "https://nam.az/api/" + city + "/" + dd;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        let currentPrayer = 5;
        const newDate = new Date();

        const tmpPrayers = prayers.map((prayer, i) => {
          prayer["time"] = data.prayers[i];
          prayer["ago"] = formatDistanceStrict(
            newDate,
            parse(data.prayers[i], "HH:mm", newDate),
            { locale: az, addSuffix: true }
          );
          if (data.prayers[i] < pref.nowis) {
            currentPrayer = i;
          }
          return prayer;
        });

        let progress = 0;
        if (pref.today !== data.dd) {
          currentPrayer = -1;
        } else {
          progress = per(currentPrayer, data.prayers, pref.nowis);
        }

        setPrayers([...tmpPrayers]);

        setPref((prev) => {
          return {
            ...prev,
            progress: progress,
            currentPrayer: currentPrayer,
            location: cities[city],
            tarix: data.tarix,
            hijri: data.hijri,
            prayerLoader: 0,
          };
        });
        // console.log("City: " + city + ". Doy: " + dd);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city, dd]);

  return (
    <div>
      <NavBar changeCity={changeCity} cities={cities} city={city} />

      <div className="container">
        <Location
          location={pref.location}
          tarix={pref.tarix}
          hijri={pref.hijri}
          dd={dd}
          changeDd={changeDd}
        />
        <Progress bar={pref.progress} />

        {pref.today === dd ? (
          <PrayerList prayers={prayers} currentPrayer={pref.currentPrayer} />
        ) : (
          <PrayerListStill prayers={prayers} />
        )}
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
