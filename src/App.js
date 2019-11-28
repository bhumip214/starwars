import React from "react";
import "./App.css";
import axios from "axios";
import MovieDropdown from "./components/MovieDropdown";
import OpeningCrawl from "./components/OpeningCrawl";
import CharacterListTable from "./components/CharacterListTable";
import { sortByDate } from "./utils/sort";

function App() {
  const [movies, setMovies] = React.useState({
    isLoading: true,
    error: false,
    data: []
  });
  const [selectedMovieTitle, setSelectedMovieTitle] = React.useState(null);

  React.useEffect(() => {
    axios
      .get("https://swapi.co/api/films")
      .then(res => {
        const sortedMovies = sortByDate(res.data.results, "release_date");
        setMovies(state => {
          return {
            ...state,
            isLoading: false,
            data: sortedMovies
          };
        });
      })
      .catch(err => {
        setMovies(state => {
          return {
            ...state,
            isLoading: false,
            error: true
          };
        });
      });
  }, []);

  if (movies.isLoading) {
    return <div className="App">Loading Movies...</div>;
  }
  if (movies.error) {
    return (
      <div className="App">
        Unxpected error has occured while loading movies!
      </div>
    );
  }

  const selectedMovie = selectedMovieTitle
    ? movies.data.find(movie => {
        return movie.title === selectedMovieTitle;
      })
    : undefined;

  return (
    <div className="App">
      <MovieDropdown movies={movies.data} onChange={setSelectedMovieTitle} />

      {selectedMovie ? (
        <div className="movie">
          <OpeningCrawl selectedMovie={selectedMovie} />
          <CharacterListTable selectedMovie={selectedMovie} />
        </div>
      ) : (
        <img
          className="large-logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Star_Wars_Logo.svg/694px-Star_Wars_Logo.svg.png"
          alt="star-wars-logo"
        />
      )}
    </div>
  );
}
export default App;
