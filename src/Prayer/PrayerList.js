import React from "react";
import Prayer from "./Prayer";

function PrayerList(props) {
  return (
    <div>
      <div className="row" id="times">
        {props.prayers.map((prayer, index) => {
          const classes = ["alert", "col-sm-12", "col-md-2"];

          if (index === props.currentPrayer) {
            classes.push("alert-success");
          } else if (index === 1) {
            classes.push("text-muted");
          }

          return (
            <Prayer classes={classes.join(" ")} prayer={prayer} key={index} />
          );
        })}
      </div>
    </div>
  );
}

export default PrayerList;
