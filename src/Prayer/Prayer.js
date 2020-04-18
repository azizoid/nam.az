import React from "react";
import { FaSun } from "react-icons/fa";

const Prayer = ({ prayer, classes, current, index }) => {
  return (
    <div className={classes}>
      <h6>{prayer.title}</h6>
      <h4>{prayer.time}</h4>
      {!current ? (
        index !== 1 ? (
          <small>{prayer.ago}</small>
        ) : (
          <FaSun style={{ color: "#f6993f" }} />
        )
      ) : (
        <span className="badge badge-warning">Zaman varkən Namazını qıl</span>
      )}
    </div>
  );
};

export default Prayer;
