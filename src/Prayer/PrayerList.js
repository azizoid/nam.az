import React from "react";
import Prayer from "./Prayer";

const PrayerList = ({ prayers, currentPrayer }) => {
  return (
    <div>
      <div className="row" id="times">
        {prayers.map((prayer, index) => {
          const classes = ["col-sm-12", "col-md-4", "col-lg-2", "alert"];
          let isCur = false;

          if (index === 1) {
            classes.push("text-muted");
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
              key={prayer.id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PrayerList;
