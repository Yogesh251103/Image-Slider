import { useEffect, useState } from "react";

const Slider = ({
  images,
  autoplay = true,
  delay = 2000,
  dots = true,
  slide,
  vertical
}) => {
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
    height: `${images.length * 100}%`,
    transform: vertical ? `translateY(${-(100 / images.length) * currIndex}%)` : `translateX(${-(100 / images.length) * currIndex}%)`,
    transition: slide && "transform 1s",
    display: "flex",
    flexDirection : vertical ? "column" : "row"
  };

  const imageStyles = {
    width: `${100 / images.length}%`,
    height: `${100 / images.length}%`,
    backgroundSize:"cover",
    backgroundPosition:"center",
    backgroundRepeat : "no-repeat",
  };

  const commonButtonStyles = {
    width: "2.5rem",
    height: "2.5rem",
    borderRadius: "50%",
    cursor: "pointer",
    display: "grid",
    placeItems: "center",
    backgroundColor: "#000",
    opacity: 0.7,
    border: 0,
    color: "white",
    fontWeight: "bold",
    position: "absolute",
    top: "50%",
  };

  const leftButtonStyles = {
    ...commonButtonStyles,
    left: "10%",
  };

  const rightButtonStyles = {
    ...commonButtonStyles,
    right: "10%",
  };

  const dotContainerStyles = {
    display: "flex",
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 10,
    left: "50%",
    transform: "translateX(-50%)",
  };

  const dotStyles = {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    backgroundColor: "black",
    opacity: "0.7",
    cursor: "pointer",
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
          <div style={{...imageStyles,backgroundImage:`url(${item})`}} key={item} draggable>

          </div>
        ))}
      </div>
      <button
        style={leftButtonStyles}
        onClick={() => handleSlideChange("prev")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          fill="currentColor"
          class="bi bi-arrow-left-short"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"
          />
        </svg>
      </button>
      <button
        style={rightButtonStyles}
        onClick={() => handleSlideChange("next")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"
          />
        </svg>
      </button>
      {dots && (
        <div style={dotContainerStyles}>
          {images.map((_, ind) => (
            <div
              style={{
                ...dotStyles,
                backgroundColor:
                  currIndex === ind ? "white" : dotStyles.backgroundColor,
              }}
              key={ind}
              onClick={() => handleDotClick(ind)}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Slider;
