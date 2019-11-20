import React from "react";
import "./App.css";
import axios from "axios";
import Dropdown from "./components/Dropdown";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      isLoading: false,
      error: false
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

  render() {
    console.log(this.state.movies);
    return (
      <div className="App">
        <header>Star Wars</header>
        <Dropdown movies={this.state.movies} />
      </div>
    );
  }
}

export default App;
