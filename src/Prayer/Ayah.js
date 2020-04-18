import React from "react";
import PropTypes from "prop-types";
import { FaQuoteLeft } from "react-icons/fa";

const Ayah = ({ ayah }) => {
  return (
    <blockquote className="ayah">
      <FaQuoteLeft style={{ color: "#66cc66" }} />
      <cite>
        {ayah.s} : {ayah.a}
      </cite>
      {ayah.c}
      <a
        href={"https://quran.az/" + ayah.s + "#" + ayah.a + "?rel=namaz"}
        target="_blank"
        rel="noopener noreferrer"
        className="link"
      >
        <br />
        <small>Surəni Tam Oxu</small>
      </a>
    </blockquote>
  );
};

Ayah.propTypes = {
  ayah: PropTypes.object.isRequired,
};

export default Ayah;
