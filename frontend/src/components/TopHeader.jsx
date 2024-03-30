import React, { useState } from "react";
import axios from "axios";
import { BsSearch, BsX } from "react-icons/bs";
import Modal from "./Model";

function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedAnime, setSelectedAnime] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (event) => {
    setSearchQuery(event.target.value.trim());
  };
  const handleCancel = () => {
    setSearchQuery(""); // Clear search query
    setShowDropdown(false); // Hide dropdown
  };

  const handleSearch = async () => {
    setLoading(true);
    setShowDropdown(true); // Set showDropdown to true when search button is clicked
    try {
      const response = await axios.get(
        `https://api.jikan.moe/v4/anime?q=${searchQuery}`
      );
      console.log("Response data:", response.data);
      // Check if response data exists and is an array
      if (response.data && Array.isArray(response.data.data)) {
        setSearchResults(response.data.data); // Set search results
      } else {
        setSearchResults([]); // If no results found, set search results to an empty array
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (anime) => {
    setSelectedAnime(anime);
    console.log(selectedAnime);
    setShowModal(true);
    setShowDropdown(false);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className='search'>
        <h5 className='search-title'>ANIMO</h5>

        <div className='search-bar'>
          <input
            className='search-input'
            type='text'
            placeholder='What are you looking for?'
            value={searchQuery}
            onChange={handleChange}
          />
          {searchQuery && ( // Render cancel icon only if searchQuery is not empty
            <button className='cancel-button' onClick={handleCancel}>
              <BsX />
            </button>
          )}

          <button className='search-button' onClick={handleSearch}>
            <BsSearch />
          </button>
        </div>
        {showDropdown && (
          <div className='search-dropdown'>
            {loading && <p>Loading...</p>}
            {searchResults && searchResults.length > 0 ? (
              searchResults.map((result) => (
                <div
                  key={result.mal_id}
                  onClick={() => handleSelect(result)}
                  className='dropdown-item'
                >
                  <img
                    src={result.images?.jpg?.small_image_url || ""}
                    alt={result.title}
                    className='dropdown-item-image'
                  />
                  <span className='dropdown-item-title'>{result.title}</span>
                </div>
              ))
            ) : (
              <p>No results found</p>
            )}
          </div>
        )}
      </div>
      <div>
        {showModal && (
          <Modal
            animeInfo={selectedAnime}
            isOpen={showModal}
            closeModal={closeModal}
          />
        )}
      </div>
    </>
  );
}

export default SearchBar;
