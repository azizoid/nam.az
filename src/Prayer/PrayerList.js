import React from "react";
import PropTypes from "prop-types";
import Prayer from "./Prayer";

const PrayerList = ({ prayers, currentPrayer }) => {
  return (
    <div className="row" id="times">
      {prayers.map((prayer, index) => {
        const classes = ["col-sm-12", "col-md-4", "alert"];
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

PrayerList.propTypes = {
  prayers: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentPrayer: PropTypes.number,
};

export default PrayerList;
