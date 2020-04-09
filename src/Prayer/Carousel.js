import React from "react";
import Ayah from "./Ayah";

const Carousel = (props) => {
  return (
    <div className="carousel slide" data-ride="carousel">
      <div className="carousel-inner">
        {props.ayah.map((carousel, i) => {
          return i == 0 ? (
            <div className="carousel-item active" key={i}>
              {carousel.c}
            </div>
          ) : (
            <div className="carousel-item" key={i}>
              {carousel.c}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Carousel;
// render(<Carousel />);
