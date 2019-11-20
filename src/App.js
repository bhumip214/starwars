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
        this.setState({ movies: res.data.results, isLoading: false });
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
