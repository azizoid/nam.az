import React from "react";
import Prayer from "./Prayer";

function PrayerList({ prayers, currentPrayer }) {
  return (
    <div>
      <div className="row" id="times">
        {prayers.map((prayer, index) => {
          const classes = ["alert", "col-sm-12", "col-md-2"];

          if (index === 1) {
            classes.push("text-muted");
          } else {
            if (index === currentPrayer) {
              classes.push("alert-success");
            }
          }

          return (
            <Prayer
              classes={classes.join(" ")}
              prayer={prayer}
              key={prayer.id}
            />
          );
        })}
      </div>
    </div>
  );
}

export default PrayerList;
