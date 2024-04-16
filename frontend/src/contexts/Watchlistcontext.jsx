import React, { createContext, useState } from "react";

export const WatchlistContext = createContext();

export const WatchlistProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState([]);

  const addToWatchlist = (animeInfo) => {
    setWatchlist((prevWatchlist) => [...prevWatchlist, animeInfo]);
  };
  const removeFromWatchlist = (animeId) => {
    setWatchlist((prevWatchlist) =>
      prevWatchlist.filter((anime) => anime.mal_id !== animeId)
    );
  };

  return (
    <WatchlistContext.Provider
      value={{ watchlist, addToWatchlist, removeFromWatchlist }}
    >
      {children}
    </WatchlistContext.Provider>
  );
};
