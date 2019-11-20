import React from "react";
import "./App.css";
import axios from "axios";

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
      </div>
    );
  }
}

export default App;
