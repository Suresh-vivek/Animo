function Card({ image, name }) {
  return (
    <div className='card' style={{ position: "relative", textAlign: "center" }}>
      <img
        src={image}
        alt='Anime'
        style={{
          maxWidth: "100%",
          maxHeight: "100%",
          objectFit: "cover",
          borderRadius: "8px",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10px",
          left: "0",
          right: "0",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          color: "white",
          padding: "8px",
          borderRadius: "0 0 8px 8px",
        }}
      >
        {name}
      </div>
    </div>
  );
}

export default Card;
