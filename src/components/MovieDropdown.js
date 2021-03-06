import React from "react";
import PropTypes from "proptypes";
import { moviePropTypes } from "./MoviePropTypes";

function MovieDropdown(props) {
  return (
    <div>
      <select autoFocus onChange={e => props.onChange(e.target.value)}>
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

MovieDropdown.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape(moviePropTypes).isRequired)
    .isRequired,
  onChange: PropTypes.func.isRequired
};

export default MovieDropdown;
