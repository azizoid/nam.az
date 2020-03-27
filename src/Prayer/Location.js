import React from "react";

function Location(props) {
  return (
    <div>
      <div className="text-center d-none d-md-block" id="location">
        <h1 className="nowis"> livetime </h1>
        <h1>{props.location}</h1>
        <small>new Date()</small>
      </div>
    </div>
  );
}

export default Location;
