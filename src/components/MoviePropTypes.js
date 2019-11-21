import PropTypes from "proptypes";

export const moviePropTypes = {
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
};
