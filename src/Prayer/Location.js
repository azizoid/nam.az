import React from "react";
import Clock from "./Clock";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

<<<<<<< Updated upstream
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
=======
const Location = ({ location, tarix, doy, changeDoy }) => {
  return (
    <div className="d-flex justify-content-center">
      <button
        className="btn btn-link"
        style={{ fontSize: "3em", color: "#6cb2eb" }}
        onClick={() => {
          changeDoy(doy - 1);
        }}
      >
        <FaChevronLeft />
      </button>
      <div className="text-center d-none d-md-block" id="location">
>>>>>>> Stashed changes
        <h1 className="nowis">
          <Clock />
        </h1>
        <h1>{location}</h1>
        <small>{tarix}</small>
<<<<<<< Updated upstream
        <br />
        <small>{hijri}</small>
=======
>>>>>>> Stashed changes
      </div>
      <button
        className="btn btn-link"
        style={{ fontSize: "3em", color: "#6cb2eb" }}
<<<<<<< Updated upstream
        onClick={() => changeDoy(doy + 1)}
=======
        onClick={(e) => {
          changeDoy(doy + 1);
        }}
>>>>>>> Stashed changes
      >
        <FaChevronRight />
      </button>
    </div>
  );
};

export default Location;
