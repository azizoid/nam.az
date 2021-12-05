import classNames from "classnames";
import { Prayer, PrayerProps } from "./Prayer";

import styles from './PrayerList.module.scss'

export type PrayerListProps = {
  prayers: PrayerProps[];
  currentPrayer?: number;
};

export const PrayerList = ({ prayers, currentPrayer }: PrayerListProps):JSX.Element => (
  <div className={classNames("row", styles.times)}>
    {prayers.map((prayer, index) => {
      const classes = ["col-12", "col-md-4", "alert"];
      let isCur = false;

      if (index === 1) {
        if (index !== currentPrayer) {
          classes.push("text-muted");
        } 
      } else {
        if (index === currentPrayer) {
          isCur = true;
          classes.push("alert-success");
        } 
      }

      return (
        <Prayer
          classes={classes.join(" ")}
          prayer={prayer}
          current={isCur}
          index={index}
          key={index}
        />
      );
    })}
  </div>
);
