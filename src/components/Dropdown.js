import React from "react";
import PropTypes from "proptypes";
import { moviePropTypes } from "./MoviePropTypes";

function Dropdown(props) {
  return (
    <div>
      <select autoFocus onChange={props.onChange}>
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

Dropdown.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape(moviePropTypes).isRequired)
    .isRequired
};

export default Dropdown;
