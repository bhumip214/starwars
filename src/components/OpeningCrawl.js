import React from "react";
import PropTypes from "proptypes";
import { moviePropTypes } from "./MoviePropTypes";

function OpeningCrawl(props) {
  return (
    <marquee behavior="scroll" direction="up" scrolldelay="150" truespeed="20">
      <header className="movie-header">
        <img
          width="200px"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Star_Wars_Logo.svg/694px-Star_Wars_Logo.svg.png"
          alt="star-wars-logo"
        />
        <h4>Episode {props.selectedMovie.episode_id}</h4>
        <h3>{props.selectedMovie.title.toUpperCase()}</h3>
      </header>
      <p>{props.selectedMovie.opening_crawl}</p>
    </marquee>
  );
}

OpeningCrawl.propTypes = {
  selectedMovie: PropTypes.shape(moviePropTypes).isRequired
};

export default OpeningCrawl;
