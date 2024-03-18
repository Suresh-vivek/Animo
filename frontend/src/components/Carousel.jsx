import React, { useState, useEffect } from "react";
import Card from "./Card";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animeData, setAnimeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const cardsPerSlide = 4;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cachedData = localStorage.getItem("seasonNowAnime");
        if (cachedData) {
          setAnimeData(JSON.parse(cachedData));
          setLoading(false);
        }

        const response = await fetch("https://api.jikan.moe/v4/seasons/now");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setAnimeData(data.data);
        localStorage.setItem("seasonNowAnime", JSON.stringify(data.data));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching anime data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalSlides = Math.ceil(animeData.length / cardsPerSlide);

  const goToNextSlide = () => {
    setCurrentSlide((currentSlide + 1) % totalSlides);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((currentSlide - 1 + totalSlides) % totalSlides);
  };

  const getAnimeSliceForSlide = (slideIndex) => {
    const startIndex = slideIndex * cardsPerSlide;
    const endIndex = Math.min(startIndex + cardsPerSlide, animeData.length);
    return animeData.slice(startIndex, endIndex);
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
          Season Now
        </h1>
        <div className='cards-container'>
          {loading ? (
            <p>Loading...</p>
          ) : (
            getAnimeSliceForSlide(currentSlide).map((anime, index) => (
              <Card
                key={index}
                image={anime.images.jpg.large_image_url}
                name={anime.title}
              />
            ))
          )}
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
