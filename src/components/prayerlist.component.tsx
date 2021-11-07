import { TPrayerList } from "../assist/types";
import { Prayer } from "./prayer.component";

export const PrayerList = ({ prayers, currentPrayer }: TPrayerList):JSX.Element => (
  <div className="row" id="times">
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
