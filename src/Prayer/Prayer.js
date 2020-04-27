import React from "react";
import PropTypes from "prop-types";
import { FaSun } from "react-icons/fa";

const Prayer = ({ prayer, classes, current, index }) => {
  return (
    <div className={classes}>
      <div className="row">
        <h6 className="col-7 col-md-12 align-self-center ">{prayer.title}</h6>

        <div className="col-5 col-md-12">
          <h4>{prayer.time}</h4>

          {!current ? (
            <>
              {index !== 1 ? (
                <small>{prayer.ago}</small>
              ) : (
                <FaSun style={{ color: "#f6993f" }} />
              )}
            </>
          ) : (
            <div className="col-12 text-center">
              <span className="badge badge-warning">
                Zaman varkən <br />
                Namazını qıl
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

Prayer.propTypes = {
  prayer: PropTypes.object.isRequired,
  classes: PropTypes.string,
  current: PropTypes.bool,
  index: PropTypes.number,
};

export default Prayer;
