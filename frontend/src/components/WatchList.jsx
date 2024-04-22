import { React, useState, useContext, useEffect } from "react";
import Card from "./Card";
import Modal from "./Model";
import { WatchlistContext } from "../contexts/Watchlistcontext";

function Watchlist() {
  const { watchlist } = useContext(WatchlistContext);

  const [showModal, setShowModal] = useState(false);
  const [selectedAnime, setSelectedAnime] = useState(null);

  const handleCardClick = (anime) => {
    setSelectedAnime(anime);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  const sendWatchlistToBackend = (watchlist) => {
    fetch("http://127.0.0.1:8000/for-you", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ watchlist }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to send watch list to backend");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data); // Log the response here
      })
      .catch((error) => {
        console.error("Error sending watch list to backend:", error);
      });
  };
  useEffect(() => {
    sendWatchlistToBackend(watchlist);
  }, [watchlist]);

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
        WatchList
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto auto auto auto",
          gap: "20px",
        }}
      >
        {watchlist.map((anime, index) => (
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
  );
}

export default Watchlist;
