function Info() {
  return (
    <div className='info'>
      <div
        style={{
          backgroundColor: "rgba(196,196,196,0.1)",
          height: "149px",
          width: "358px",
        }}
      ></div>
      <div
        style={{
          backgroundColor: "rgb(54,57,62,1)",
          height: "162px",
          width: "104px",
          position: "absolute",
          zIndex: "15",
          top: "35px",
        }}
      ></div>
      <div style={{ padding: "30px 40px 10px 3px" }}>
        <h1 style={{ fontFamily: "inter", fontWeight: "400" }}>Anime Name</h1>
        <h2 style={{ color: "rgba(196,196,196,0.2)" }}>Genre</h2>
        <div
          style={{
            backgroundColor: "rgba(196,196,196,0.1)",
            height: "30px",
            marginBottom: "30px",
          }}
        ></div>
        <div
          style={{
            backgroundColor: "rgba(196,196,196,0.1)",
            height: "30px",
            margin: "0 60px 30px 0",
          }}
        ></div>
        <div
          style={{
            backgroundColor: "rgba(196,196,196,0.1)",
            height: "30px",
            marginBottom: "30px",
          }}
        ></div>
        <div
          style={{ backgroundColor: "rgba(196,196,196,0.1)", height: "180px" }}
        ></div>
      </div>
    </div>
  );
}

export default Info;
