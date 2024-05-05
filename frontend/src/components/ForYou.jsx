import { React, useState, useContext, useEffect } from "react";
import Card from "./Card";
import Modal from "./Model";
import { WatchlistContext } from "../contexts/Watchlistcontext";

import SearchBar from "./TopHeader";
function ForYou() {
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
        console.log(data);
        setSelectedAnime(data);
      })
      .catch((error) => {
        console.error("Error sending watch list to backend:", error);
      });
  };
  useEffect(() => {
    sendWatchlistToBackend(watchlist);
  }, [watchlist]);

  return (
    <div>
      <SearchBar />
    </div>
  );
}

export default ForYou;
