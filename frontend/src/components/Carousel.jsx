import React, { useState } from "react";
import Card from "./Card";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 4;

  const goToNextSlide = () => {
    setCurrentSlide(currentSlide === totalSlides - 1 ? 0 : currentSlide + 1);
  };

  const goToPrevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? totalSlides - 1 : currentSlide - 1);
  };

  return (
    <div className='carousel-container'>
      <div className='carousel'>
        <h1
          style={{
            fontFamily: "Inter",
            fontWeight: 600,
            marginRight: "20px",
            marginBottom: "20px",
          }}
        >
          Trending
        </h1>
        <div
          className='cards-container'
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
        <div className='navigation-buttons'>
          <button onClick={goToPrevSlide}>
            <FaArrowLeft />
          </button>
          <button onClick={goToNextSlide}>
            <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Carousel;
