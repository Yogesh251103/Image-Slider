import { useEffect, useState } from "react";

const Slider = ({ images, autoplay = true, delay = 2000, dots = true, button }) => {
  const [currIndex, setCurrIndex] = useState(0);

  const slidesContainerStyles = {
    height: "100%",
    width: "100%",
    overflow: "hidden",
    position: "relative",
    borderRadius: "1rem",
  };

  const slideStyles = {
    width: `${images.length * 100}%`,
    height: "100%",
    transform: `translateX(${-(100 / images.length) * currIndex}%)`,
    transition: "transform 1s",
    display: "flex",
  };

  const imageStyles = {
    width: `${100 / images.length}%`,
    height: "100%",
    objectFit: "cover",
    flexGrow: 0,
    flexShrink: 0,
  };

  const commonButtonStyles = {
    width : "2.5rem",
    height : "2.5rem",
    borderRadius : "50%",
    cursor : "pointer",
    display : "grid",
    placeItems : "center",
    backgroundColor : "#000",
    opacity : 0.7,
    border : 0,
    color : "white",
    fontWeight:"bold"
  }

  const leftButtonStyles = {
    ...commonButtonStyles,
    position: "absolute",
    top: "50%",
    left: "10%",
    padding: "10px",
  };

  const rightButtonStyles = {
    ...commonButtonStyles,
    position: "absolute",
    top: "50%",
    right: "10%",
    padding: "10px",
  };

  const dotContainerStyles = {
    display: "flex",
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 10,
    left: "50%",
    transform: 'translateX(-50%)'
  };

  const dotStyles = {
    width: "10px",
    height: "10px",
    borderRadius : "50%",
    backgroundColor : "black",
    opacity:"0.7",
    cursor : "pointer"
  };

  useEffect(() => {
    if (!autoplay) return;

    const timer = setTimeout(() => {
      setCurrIndex((prev) => (prev + 1) % images.length);
    }, delay);

    return () => clearTimeout(timer);
  }, [currIndex, autoplay, delay, images.length]);

  const handleSlideChange = (navigation) => {
    switch (navigation) {
      case "prev":
        if (currIndex === 0) setCurrIndex(images.length - 1);
        else setCurrIndex(currIndex - 1);
        break;
      case "next":
        if (currIndex === images.length - 1) setCurrIndex(0);
        else setCurrIndex(currIndex + 1);
        break;
    }
  };

  const handleDotClick = (index) => {
    setCurrIndex(index);
  };

  return (
    <div style={slidesContainerStyles}>
      <div style={slideStyles}>
        {images.map((item) => (
          <img style={imageStyles} src={item} key={item} alt="dog image" />
        ))}
      </div>
      <button
        style={leftButtonStyles}
        onClick={() => handleSlideChange("prev")}
      >
        {"<"}
      </button>
      <button
        style={rightButtonStyles}
        onClick={() => handleSlideChange("next")}
      >
        {">"}
      </button>
      {dots && (
        <div style={dotContainerStyles}>
          {images.map((_, ind) => (
            <div
              style={{
                ...dotStyles,
                backgroundColor: currIndex === ind ? "white" : dotStyles.backgroundColor,
              }}
              key={ind}
              onClick={() => handleDotClick(ind)}
            >
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Slider;
