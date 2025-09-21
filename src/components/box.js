export default function Boxs({ count, imageNames, titles, description }) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="box">
          <img src={ `./images/${imageNames[index]}` } alt={ titles[index] } style={{ width: "100px", height: "100px" }} />
          <h6 style={{ marginTop: "auto", marginBottom: "auto" }}> {titles[index]} </h6>
          <p style={{ fontSize: "medium" }}>{description[index]}</p>
        </div>
      ))}
    </>
  );
}