import React from "react";
import axios from "axios";
import GenderDropdown, { genderAbbreviation } from "./GenderDropdown";
import PropTypes from "proptypes";
import { moviePropTypes } from "./MoviePropTypes";

class CharacterListTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      characters: [],
      error: false,
      sortBy: null,
      sortOrder: null,
      selectedGender: null
    };
  }

  componentDidMount() {
    this.fetchCharacters();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.selectedMovie.episode_id !== prevProps.selectedMovie.episode_id
    ) {
      this.fetchCharacters();
    }
  }

  fetchCharacters = async () => {
    this.setState({ isLoading: true });
    try {
      const characters = await Promise.all(
        this.props.selectedMovie.characters.map(character => {
          return axios.get(`${character}`).then(res => {
            return res.data;
          });
        })
      );
      this.setState({ characters: characters, isLoading: false });
    } catch (error) {
      this.setState({ error: true });
    }
  };

  handleSortByName = () => {
    if (this.state.sortBy === "name" && this.state.sortOrder === "asc") {
      this.setState({
        sortBy: "name",
        sortOrder: "desc"
      });
    } else {
      this.setState({
        sortBy: "name",
        sortOrder: "asc"
      });
    }
  };

  handleSortByGender = () => {
    if (this.state.sortBy === "gender" && this.state.sortOrder === "asc") {
      this.setState({
        sortBy: "gender",
        sortOrder: "desc"
      });
    } else {
      this.setState({
        sortBy: "gender",
        sortOrder: "asc"
      });
    }
  };

  handleSortByHeight = () => {
    if (this.state.sortBy === "height" && this.state.sortOrder === "asc") {
      this.setState({
        sortBy: "height",
        sortOrder: "desc"
      });
    } else {
      this.setState({
        sortBy: "height",
        sortOrder: "asc"
      });
    }
  };

  getTotalHeight = characters => {
    const sum = characters.reduce((acc, char) => {
      const height = Number(char.height);
      // height can also be "unknown", perform NaN check
      return isNaN(height) ? acc : acc + height;
    }, 0);
    const feet = sum * 0.0328084;
    const roundedFeet = Math.floor(feet);
    const inches = ((feet - roundedFeet) * 12).toFixed(2);

    return `${sum}cm (${roundedFeet}ft / ${inches}in)`;
  };

  getSortedCharacters() {
    let sortedCharacters = this.state.characters;

    if (this.state.sortOrder !== null && this.state.sortBy !== null) {
      const sortOrder = this.state.sortOrder;
      const sortBy = this.state.sortBy;

      sortedCharacters = [...this.state.characters].sort((a, b) => {
        if (sortBy === "height") {
          return Number(a.height) - Number(b.height);
        } else {
          return a[sortBy].localeCompare(b[sortBy]);
        }
      });

      if (sortOrder === "desc") {
        sortedCharacters.reverse();
      }
    }
    return sortedCharacters;
  }

  getAllGenders = () => {
    const genders = [];
    this.state.characters.forEach(character => {
      if (genders.indexOf(character.gender) === -1) {
        genders.push(character.gender);
      }
    });
    return genders;
  };

  handleSelectGender = e => {
    if (e.target.value === "null") {
      this.setState({ selectedGender: null });
    } else {
      this.setState({ selectedGender: e.target.value });
    }
  };

  render() {
    const sortedCharacters = this.getSortedCharacters();
    const characters =
      this.state.selectedGender === null
        ? this.getSortedCharacters()
        : sortedCharacters.filter(character => {
            return character.gender === this.state.selectedGender;
          });
    if (this.state.isLoading) {
      return <div>Loading Characters...</div>;
    }

    if (this.state.error) {
      return (
        <div>Unexpected error has occured while fetching the Characters!</div>
      );
    }

    return (
      <div>
        <GenderDropdown
          selectedGender={this.state.selectedGender}
          genders={this.getAllGenders()}
          onChange={this.handleSelectGender}
        />
        <div className="character-list-table">
          <table>
            <thead>
              <tr>
                <th onClick={this.handleSortByName}>Name</th>
                <th onClick={this.handleSortByGender}>Gender</th>
                <th onClick={this.handleSortByHeight}>Height</th>
              </tr>
            </thead>
            <tbody>
              {characters.map(character => {
                return (
                  <tr key={character.url}>
                    <td>{character.name}</td>
                    <td>{genderAbbreviation[character.gender]}</td>
                    <td>{character.height} </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <td>Total: {characters.length} </td>
                <td></td>
                <td>Sum: {this.getTotalHeight(characters)} </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    );
  }
}

CharacterListTable.propTypes = {
  selectedMovie: PropTypes.shape(moviePropTypes).isRequired
};

export default CharacterListTable;
