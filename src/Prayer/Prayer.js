import React from "react";

const Prayer = ({ prayer, classes, current }) => {
  return (
    <div className={classes}>
      <h6>{prayer.title}</h6>
      <h2>{prayer.time}</h2>
      {!current ? (
        <small>{prayer.ago}</small>
      ) : (
        <span className="badge badge-warning">Zaman varkən Namazını qıl</span>
      )}
    </div>
  );
};

export default Prayer;
