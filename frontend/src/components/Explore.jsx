import React, { useState, useEffect } from "react";
import Card from "./Card";
import Modal from "./Model";

function Explore() {
  const [topAnime, setTopAnime] = useState([]);
  const [selectedAnime, setSelectedAnime] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cachedData = localStorage.getItem("topAnime");
        if (cachedData) {
          setTopAnime(JSON.parse(cachedData));
        }

        const response = await fetch(
          "https://api.jikan.moe/v4/top/anime?filter=bypopularity"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setTopAnime(data.data);
        localStorage.setItem("topAnime", JSON.stringify(data.data));
      } catch (error) {
        console.error("Error fetching top anime:", error);
      }
    };

    fetchData();
  }, []);

  const handleCardClick = (anime) => {
    setSelectedAnime(anime);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="explore" style={{ overflowX: "hidden", overflowY: "auto" , display: "flex", flexDirection: "row" }}>
      <div>
      <h1
        style={{
          fontFamily: "Montserrat",
          fontWeight: 600,
          marginRight: "20px",
          marginBottom: "20px",
          backgroundColor: "#323232",
          width:"200px",
          borderRadius: "10px",
          padding: "10px",
        }}
      >
        Trending
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto auto auto auto",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        {topAnime.map((anime, index) => (
          <Card
            key={index}
            image={anime.images.jpg.large_image_url}
            name={anime.title}
            onClick={() => handleCardClick(anime)}
          />
        ))}
        {showModal && (
          <Modal
            animeInfo={selectedAnime}
            isOpen={showModal}
            closeModal={closeModal}
          />
        )}
      </div>
      </div>
    </div>
  );
}

export default Explore;
