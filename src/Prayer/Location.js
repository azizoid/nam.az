import React from "react";
import Clock from "./Clock";

const Location = ({ location, date }) => {
  return (
    <div>
      <div className="text-center d-none d-md-block" id="location">
        <h1 className="nowis">
          <Clock />
        </h1>
        <h1>{location}</h1>
        <small>{date}</small>
      </div>
    </div>
  );
};

export default Location;
