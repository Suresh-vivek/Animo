import React from "react";
import "./modal.css";
import play from "../assets/play.svg";

function Modal({ isOpen, closeModal, animeInfo }) {
  const handleOverlayClick = (event) => {
    if (event.target.classList.contains("modal-overlay")) {
      closeModal();
    }
  };
  const extractRating = (rating) => {
    return rating.substring(0, 6);
  };
  const extractduration = (rating) => {
    return rating.substring(0, 4);
  };
  const extractSynonyms = (synonyms) => {
    if (synonyms.length > 1) {
      return synonyms[0] + " " + synonyms[1];
    }
    return synonyms[0];
  };
  function extractGenreNames(genres) {
    return genres.map((genre) => genre.name);
  }

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-data">
          <div className="anime-image">
            {/*Anime  Image */}
            <img src={animeInfo.images.jpg.large_image_url} alt="Anime" />
          </div>

          {/*ANime Details */}
          <div className="anime-detail">
            <div className="anime-title">{animeInfo.title}</div>

            <div className="anime-tags">
              <div className="rating">{extractRating(animeInfo.rating)}</div>
              <div className="score">{animeInfo.score}</div>
              <div className="status">{animeInfo.status}</div>
              <div className="type"> {animeInfo.type}</div>
              <div className="duration">
                {extractduration(animeInfo.duration)}
              </div>
            </div>

            <div className="trailer">
              <img src={play} alt="Play" />
              <div className="play">
                <a
                  href={animeInfo.trailer.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="watch-trailer"
                >
                  Watch Trailer
                </a>
              </div>
            </div>

            <div className="synopsis">{animeInfo.synopsis}</div>
          </div>

          <div className="other-detail">
            <div className="details">
              <span className="titles ">Japanese: </span>
              <span className="values"> {animeInfo.title_japanese}</span>
            </div>
            <div className="details">
              <span className="titles">Synonyms: </span>
              <span className="values">
                {" "}
                {extractSynonyms(animeInfo.title_synonyms)}
              </span>
            </div>

            <div className="details">
              <span className="titles">Aired: </span>
              <span className="values"> {animeInfo.aired.string}</span>
            </div>

            <div className="details">
              <span className="titles">Premiered: </span>
              <span className="values">
                {" "}
                {animeInfo.season} {animeInfo.year}
              </span>
            </div>

            <div className="details">
              <span className="titles">Source: </span>
              <span className="values"> {animeInfo.source}</span>
            </div>

            <div className="details">
              <span className="titles">Episodes: </span>
              <span className="values"> {animeInfo.episodes}</span>
            </div>

            <div className="details">
              <span className="titles">Duration: </span>
              <span className="values">
                {" "}
                {extractduration(animeInfo.duration)}
              </span>
            </div>
            <hr></hr>
            <div className="details">
              <span className="titles">Genre: </span>
              <span className="values ">
                {" "}
                {extractGenreNames(animeInfo.genres).map((genre, index) => (
                  <span key={index} className="genre-item">
                    {genre}
                  </span>
                ))}
              </span>
            </div>
            <hr></hr>

            <div className="details">
              <span className="titles">Studios: </span>
              <span className="values">
                {" "}
                {animeInfo.studios.map((studio, index) => (
                  <span key={index} className="studio-item">
                    <a
                      href={studio.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="watch-studio"
                    >
                      {studio.name}
                    </a>
                  </span>
                ))}
              </span>
            </div>

            <div className="details">
              <span className="titles">Producers: </span>
              <span className="values">
                {animeInfo.producers.slice(0, 2).map((producer, index) => (
                  <span key={producer.mal_id}>
                    {producer.name}
                    {index !== 1 && <span>, </span>}
                  </span>
                ))}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
