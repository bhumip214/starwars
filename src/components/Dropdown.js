import React from "react";

function Dropdown(props) {
  return (
    <div>
      <select autoFocus>
        <option value="null">Select a Movie</option>
        <option disabled="disabled">--------------------------</option>
        {props.movies.map(movie => {
          return (
            <option key={movie.episode_id} value={movie.title}>
              {movie.title}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default Dropdown;
