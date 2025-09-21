import { useState, useEffect } from "react";

export default function Slide({ count, imageNames, titles, description }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const intervalTime = 3000;

  // Automatically change slides
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % count);
    }, intervalTime);

    return () => clearInterval(slideInterval); // cleanup on unmount
  }, [count]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className={`slide ${currentSlide === index ? "active" : ""}`} >
          <img src={`./images/${imageNames[index]}`} alt={titles[index]} style={{ width: "100px", height: "100px" }} />
          <h6 style={{ marginTop: "auto", marginBottom: "auto" }}>
            {titles[index]}
          </h6>
          <p style={{ fontSize: "medium" }}>{description[index]}</p>
        </div>
      ))}

      <div className="bubbles">
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className={`bubble ${currentSlide === index ? "active" : ""}`}
            onClick={() => goToSlide(index)}
          ></div>
        ))}
      </div>
    </>
  );
}
