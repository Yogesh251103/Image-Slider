import { useEffect, useRef, useState } from "react";

const Slider = ({
  images,
  autoplay = false,
  delay = 2000,
  dots = true,
  slide,
  vertical,
}) => {
  const [currIndex, setCurrIndex] = useState(0);
  const [clickPosition, setClickPosition] = useState();
  const imageRef = useRef();

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
    transform: vertical
      ? `translateY(${-(100 / images.length) * currIndex}%)`
      : `translateX(${-(100 / images.length) * currIndex}%)`,
    transition: slide && "transform 1s",
    display: "flex",
    flexDirection: vertical ? "column" : "row",
  };

  const imageStyles = {
    width: `${100 / images.length}%`,
    height: `${100 / images.length}%`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
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
        setCurrIndex((currIndex + 1) % images.length);
        break;
    }
  };

  const handleDotClick = (index) => {
    setCurrIndex(index);
  };

  const handleMouseDown = (e) => {
    setClickPosition(e.clientY);
  };

  window.addEventListener("mouseup", (e) => {
    if (clickPosition == 0) return;
    const dropPosition = e.clientY;
    const rect = imageRef.current.getBoundingClientRect();
    const height = rect.bottom - rect.top;
    const percentage = ((clickPosition - dropPosition) / height) * 100;
    console.log("clickPosition:",clickPosition,"dropPosition:",dropPosition,"height:",height,"percentage:",percentage)
    if (percentage >= 40) {
      setCurrIndex((currIndex + 1) % images.length);
    }
    setClickPosition(0);
  });

  return (
    <div style={slidesContainerStyles}>
      <div style={slideStyles}>
        {images.map((item, index) => (
          <div
            ref={index === 0 ? imageRef : null}
            style={{ ...imageStyles, backgroundImage: `url(${item})` }}
            key={item}
          
            onMouseDown={handleMouseDown}
          />
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
