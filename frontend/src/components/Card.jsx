function Card({ image, name }) {
  return (
    <div className='card'>
      <img
        src={image}
        alt='Anime'
        style={{ maxWidth: "100%", height: "auto" }}
      />
      <div style={{ marginTop: "10px" }}>{name}</div>
    </div>
  );
}

export default Card;
