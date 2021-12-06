import { useState, useEffect, useRef, lazy, Suspense } from "react";

import { NavBar } from "./components/navbar.component";
//import Ramadan from "./components/ramadan.component";

import { Progress} from "./components/progress.component";
import { PrayerList } from "./components/prayerlist.component";
import { PrayerListStill } from "./components/prayerliststill.component";

import { Footer } from "./components/footer.component";
import { Loader } from "./components/loader.component";

import {
  format,
  formatDistanceStrict,
  parse,
  differenceInSeconds,
  getDayOfYear,
} from "date-fns";
import az from "date-fns/locale/az";

import cities from "./assist/cities";
import { TPrayer } from "./assist/types";

const Location = lazy(() => import("./components/Location/Location"));
const Ayah = lazy(() => import("./components/ayah.component"));

const App = ():JSX.Element => {
  const newDate = useRef(new Date());
  const today = getDayOfYear(newDate.current) + 1;

  const [prayers, setPrayers] = useState([
    { id: 1, time: "-:-", rakat: 2, ago: "", title: "Sübh namazı" },
    { id: 2, time: "-:-", rakat: 0, ago: "", title: "Günəş" },
    { id: 3, time: "-:-", rakat: 4, ago: "", title: "Zöhr namazı" },
    { id: 4, time: "-:-", rakat: 4, ago: "", title: "Əsr namazı" },
    { id: 5, time: "-:-", rakat: 3, ago: "", title: "Məğrib namazı" },
    { id: 6, time: "-:-", rakat: 4, ago: "", title: "İşa namazı" },
  ]);

  const [pref, setPref] = useState({
    location: "Bakı",
    currentPrayer: -1,
    nowis: format(newDate.current, "HH:mm"),
    tarix: format(newDate.current, "EEEE, d MMMM yyyy", { locale: az }),
    hijri: "",
    today: today,
    progress: 0,
    ramadan: 0,
  });

  const [city, setCity] = useState(
    JSON.parse(localStorage.getItem("city") as string) || "1"
  );
  const [dd, setDd] = useState(today);

  useEffect(() => {
    const fetchData = async () => {
      
      await fetch(`https://nam.az/api/${city}/${dd}`)
        .then((response) => response.json())
        .then((data:any) => {
          let currentPrayer = 5;

          setPrayers((prev) =>
            prev.map((prayer: TPrayer, i) => {
              prayer["time"] = data.prayers[i];
              prayer["ago"] = formatDistanceStrict(
                newDate.current,
                parse(data.prayers[i], "HH:mm", newDate.current),
                { locale: az, addSuffix: true }
              );
              if (data.prayers[i] < pref.nowis) {
                currentPrayer = i;
              }
              return prayer;
            })
          );

          let progress = 0;
          if (pref.today !== data.dd) {
            currentPrayer = -1;
          } else {
            progress = percentageCounter(
              currentPrayer,
              data.prayers,
              pref.nowis
            );
          }

          setPref((prev) => ({
            ...prev,
            progress: progress,
            currentPrayer: currentPrayer,
            location: cities[city],
            tarix: data.tarix,
            hijri: data.hijri,
            ramadan: data.dd - 103,
          }));
        });
    };
    fetchData();
  }, [city, dd, pref.nowis, pref.today]);

  const percentageCounter = (
    currentPrayer: number,
    prayersFromApi: string[],
    nowis: string
  ): number => {
    const untillNow = differenceInSeconds(
      parse(nowis, "HH:mm", newDate.current),
      parse(prayersFromApi[currentPrayer], "HH:mm", newDate.current)
    );

    let untillNext;
    if (currentPrayer === 5) {
      untillNext = differenceInSeconds(
        parse("23:59", "HH:mm", newDate.current),
        parse(prayersFromApi[currentPrayer], "HH:mm", newDate.current)
      );
    } else {
      untillNext = differenceInSeconds(
        parse(prayersFromApi[currentPrayer++], "HH:mm", newDate.current),
        parse(prayersFromApi[currentPrayer], "HH:mm", newDate.current)
      );
    }

    return Math.abs(Math.floor((untillNow * 100) / untillNext));
  };

  const changeCity = (v: number): void => {
    if (!(v in cities)) return;

    if (v !== 0) {
      localStorage.setItem("city", JSON.stringify(v));
      setPref((prev) => ({ ...prev, location: cities[v] }));
      setCity(v);
    }
  };

  return (
    <>
      <NavBar changeCity={changeCity} city={city} />

      <div className='container locationBlock'>
        <Suspense fallback={<Loader />}>
          <Location
            location={pref.location}
            tarix={pref.tarix}
            hijri={pref.hijri}
            dd={dd}
            changeDd={(v: number) => setDd(v)}
          />
          <Progress bar={pref.progress} />
        </Suspense>

        {pref.today === dd ? (
          <PrayerList prayers={prayers} currentPrayer={pref.currentPrayer} />
        ) : (
          <PrayerListStill prayers={prayers} />
        )}

        <Suspense fallback={<Loader />}>
          <Ayah />
        </Suspense>
      </div>

      <Footer />
    </>
  );
};

export default App;
