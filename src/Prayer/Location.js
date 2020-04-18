import React from "react";
import Clock from "./Clock";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Location = ({ location, tarix, hijri, doy, changeDoy }) => {
  return (
    <div className="d-flex align-items-center justify-content-center">
      <button
        className="btn btn-link"
        style={{ fontSize: "3em", color: "#6cb2eb" }}
        onClick={() => changeDoy(doy - 1)}
      >
        <FaChevronLeft />
      </button>
      <div className="text-center col-md-5" id="location">
        <h1 className="nowis">
          <Clock />
        </h1>
        <h1>{location}</h1>
        <small>{tarix}</small>
        <br />
        <small>{hijri}</small>
      </div>
      <button
        className="btn btn-link"
        style={{ fontSize: "3em", color: "#6cb2eb" }}
        onClick={() => changeDoy(doy + 1)}
      >
        <FaChevronRight />
      </button>
    </div>
  );
};

export default Location;
