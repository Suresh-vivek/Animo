// Modal.js
import React from "react";
function Modal({ anime, onClose }) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "8px",
          maxWidth: "80%",
          maxHeight: "80%",
          overflowY: "auto",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
            fontSize: "20px",
          }}
        >
          &times;
        </button>
        <h2>{anime.title}</h2>
        <img
          src={anime.image_url}
          alt={anime.title}
          style={{ maxWidth: "100%", height: "auto" }}
        />
        <p>{anime.synopsis}</p>
        <p>Episodes: {anime.episodes}</p>
        <p>Type: {anime.type}</p>
        <p>Score: {anime.score}</p>
      </div>
    </div>
  );
}

export default Modal;
