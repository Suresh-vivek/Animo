import React, { useState, useEffect } from "react";
import Card from "./Card";
import Modal from "./Modal";

function Explore() {
  const [topAnime, setTopAnime] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAnime, setSelectedAnime] = useState(null);

  const openModal = (anime) => {
    setSelectedAnime(anime);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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

  return (
    <div className='explore' style={{ overflowX: "hidden", overflowY: "auto" }}>
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
        style={{
          display: "grid",
          gridTemplateColumns: "auto auto auto auto",
          gap: "20px",
        }}
      >
        {topAnime.map((anime, index) => (
          <Card
            key={index}
            image={anime.images.jpg.large_image_url}
            name={anime.title}
            onClick={() => openModal(anime)}
          />
        ))}
        {isModalOpen && <Modal anime={selectedAnime} onClose={closeModal} />}
      </div>
    </div>
  );
}

export default Explore;
