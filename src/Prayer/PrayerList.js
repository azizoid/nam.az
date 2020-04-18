import React from "react";
import Prayer from "./Prayer";

const PrayerList = ({ prayers, currentPrayer }) => {
  return (
    <div className="row" id="times">
      {prayers.map((prayer, index) => {
<<<<<<< Updated upstream
        const classes = ["col-sm-12", "col-md-4", "alert"];
=======
        const classes = ["col-sm-12", "col-md-4", "alert", "col-lg-2"];
>>>>>>> Stashed changes
        let isCur = false;

        if (index === 1) {
          if (index === currentPrayer) {
            classes.push("col-lg-2");
          } else {
            classes.push("text-muted", "col-lg-1");
          }
        } else {
          if (index === currentPrayer) {
            isCur = true;
            classes.push("alert-success", "col-lg-3");
          } else {
            classes.push("col-lg-2");
          }
        }

        return (
          <Prayer
            classes={classes.join(" ")}
            prayer={prayer}
            current={isCur}
            index={index}
            key={prayer.id}
          />
        );
      })}
    </div>
  );
};

export default PrayerList;
