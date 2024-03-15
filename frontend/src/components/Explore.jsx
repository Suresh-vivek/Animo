import Card from "./Card";

function Explore() {
  return (
    <div className='explore'>
      <h1 style={{ fontFamily: "inter", fontWeight: 600 }}>Trending</h1>
      <div
        style={{ display: "grid", gridTemplateColumns: "auto auto auto auto" }}
      >
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
}

export default Explore;
