import React from "react";

function Prayer({ prayer, classes }) {
  return (
    <div className={classes}>
      <h6>{prayer.title}</h6>
      <h2>{prayer.time}</h2>
      <small>13 sat ago</small>
    </div>
  );
}

export default Prayer;
