import React from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";
import { az } from "date-fns/locale";

const Ramadan = ({ day }) => {
  const classes = ["progress-bar"];
  const wd = (day * 100) / 30;

  if (day > 18) classes.push("bg-success");
  else classes.push("bg-warning");

  return (
    <>
      <div className="progress" style={{ height: "5px" }}>
        <div
          className={classes.join(" ")}
          role="progressbar"
          style={{ width: wd + "%" }}
          aria-valuenow={wd}
          aria-valuemin="1"
          aria-valuemax="30"
        ></div>
      </div>
      <h5 className="text-center">
        <small className="badge badge-warning">
          Ramazan ayı, {format(new Date(2020, 4, day), "do", { locale: az })}{" "}
          gün
        </small>
      </h5>
    </>
  );
};

Ramadan.propTypes = {
  day: PropTypes.number,
};

export default Ramadan;
