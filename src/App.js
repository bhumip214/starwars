import React from "react";
import "./App.css";
import axios from "axios";
import MovieDropdown from "./components/MovieDropdown";
import OpeningCrawl from "./components/OpeningCrawl";
import CharacterListTable from "./components/CharacterListTable";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      isLoading: false,
      error: false,
      selectedMovie: null
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    axios
      .get("https://swapi.co/api/films")
      .then(res => {
        const sortedMovies = res.data.results.sort((a, b) => {
          return new Date(a.release_date) - new Date(b.release_date);
        });
        this.setState({ movies: sortedMovies, isLoading: false });
      })
      .catch(err => {
        this.setState({ error: true });
      });
  }

  handleSelectMovie = e => {
    if (e.target.value === "null") {
      this.setState({ selectedMovie: null });
    } else {
      const movie = this.state.movies.find(movie => {
        return movie.title === e.target.value;
      });
      this.setState({ selectedMovie: movie });
    }
  };

  render() {
    if (this.state.isLoading) {
      return <div className="App">Loading Movies...</div>;
    }
    if (this.state.error) {
      return (
        <div className="App">
          Unxpected error has occured while loading movie!
        </div>
      );
    }
    return (
      <div className="App">
        <MovieDropdown
          movies={this.state.movies}
          onChange={this.handleSelectMovie}
        />

        {this.state.selectedMovie === null ? (
          <img
            className="large-logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Star_Wars_Logo.svg/694px-Star_Wars_Logo.svg.png"
            alt="star-wars-logo"
          />
        ) : (
          <div className="movie">
            <OpeningCrawl selectedMovie={this.state.selectedMovie} />
            <CharacterListTable selectedMovie={this.state.selectedMovie} />
          </div>
        )}
      </div>
    );
  }
}

export default App;
