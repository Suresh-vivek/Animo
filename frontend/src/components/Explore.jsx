import React, { useState, useEffect } from "react";
import Card from "./Card";

function Explore() {
  const [topAnime, setTopAnime] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cachedData = localStorage.getItem("topAnime");
        if (cachedData) {
          setTopAnime(JSON.parse(cachedData));
        }
        setLoading(false);

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
          gap: "20px", // Add gap between cards
        }}
      >
        {loading ? (
          <p>Loading...</p>
        ) : (
          topAnime.map((anime, index) => (
            <Card
              key={index}
              image={anime.images.jpg.image_url}
              name={anime.title}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Explore;
