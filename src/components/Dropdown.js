import React from "react";
import PropTypes from "proptypes";

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

Dropdown.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      characters: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
      created: PropTypes.string.isRequired,
      director: PropTypes.string.isRequired,
      edited: PropTypes.string.isRequired,
      episode_id: PropTypes.number.isRequired,
      opening_crawl: PropTypes.string.isRequired,
      planets: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
      producer: PropTypes.string.isRequired,
      release_date: PropTypes.string.isRequired,
      species: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
      starships: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      vehicles: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
    }).isRequired
  ).isRequired
};

export default Dropdown;
