import React from "react";
import PropTypes from "prop-types";

const Progress = ({ bar }) => {
  const classes = ["progress-bar"];
  if (bar > 75) {
    classes.push("bg-danger");
  } else {
    classes.push("bg-info");
  }
  return (
    <div className="progress" style={{ height: "5px" }}>
      <div
        className={classes.join(" ")}
        role="progressbar"
        style={{ width: bar + "%" }}
        aria-valuenow={bar}
        aria-valuemin="0"
        aria-valuemax="100"
      ></div>
    </div>
  );
};

Progress.propTypes = {
  bar: PropTypes.number,
};

export default Progress;
