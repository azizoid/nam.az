import React from "react";

const Ayah = ({ ayah }) => {
  return (
    <blockquote className="ayah">
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

export default Ayah;
