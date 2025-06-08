import Slider from "./Slider";

const SliderContainer = () => {
  const containerStyles = {
    width: "70vw",
    height: "60vh",
  };

  const images = [
    "https://imgs.search.brave.com/NxJ1rCodDxpLw_ZCzhDsR63MoQls9PAgRXCgKrzQpDA/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA2LzMwLzc2Lzg3/LzM2MF9GXzYzMDc2/ODc1Nl9ISUJnenZS/R3E5RXZyM3REYjVO/SzlQbVFTUVJxQ1lh/di5qcGc",
    "https://imgs.search.brave.com/4_JEZordJi8rdnW3jJfp1gVg-Nbm2j0UyOl7exoDdFo/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTc2/MjMwNjUzL3Bob3Rv/L2JlYWNoLWRvZy5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/XzExa05hdUNYbEZv/Y3lQdG9KY3l1MkI4/bTZKMGtJSndwT0Ja/Y3lyYkVlcz0",
    "https://imgs.search.brave.com/jFX2KhmgNPvcB_cnMPA0g7ktUcmQftKzXtEkqzoA93U/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA5LzAyLzIyLzg0/LzM2MF9GXzkwMjIy/ODQxNF9ZQ1E5ZlpN/Z1ZzOWRzNlhYUGdO/d0tCSGlybjdjSG5n/WC5qcGc",
    "https://imgs.search.brave.com/1RRxscJgVDfvV0JTdrKjhN-ABwBkOtHUw7yZHrsKiSU/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTcw/NDYyODU2L3Bob3Rv/L2RvZy13b3JraW5n/LWNvbWZvcnRhYmx5/LWZyb20taG9tZS5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/YmtXVTgzWGN2VmR4/UUJ2UW1vcVZOa00t/ekxac0d5NEJaUFdX/UVFxek1vaz0",
  ];

  const button = (
    <button style={{ padding: "10px", fontSize: "1rem" }}>{"<"}</button>
  );
  return (
    <div style={containerStyles}>
      <Slider
        images={images}
      />
    </div>
  );
};

export default SliderContainer;
