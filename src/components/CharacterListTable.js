import React from "react";
import axios from "axios";
import GenderDropdown, { genderAbbreviation } from "./GenderDropdown";
import PropTypes from "proptypes";
import { moviePropTypes } from "./MoviePropTypes";

const charactersCache = {};

async function fetchCharacters(characterUrls) {
  const characters = await Promise.all(
    characterUrls.map(characterUrl => {
      // look up from cache
      if (charactersCache[characterUrl]) {
        return charactersCache[characterUrl];
      } else {
        return axios.get(characterUrl).then(res => {
          charactersCache[characterUrl] = res.data;
          return res.data;
        });
      }
    })
  );

  return characters;
}

function getTotalHeight(characters) {
  const sum = characters.reduce((acc, char) => {
    const height = Number(char.height);
    // height can also be "unknown", perform NaN check
    return isNaN(height) ? acc : acc + height;
  }, 0);
  const feet = sum * 0.0328084;
  const roundedFeet = Math.floor(feet);
  const inches = ((feet - roundedFeet) * 12).toFixed(2);

  return `${sum}cm (${roundedFeet}ft / ${inches}in)`;
}

function getAllGenders(characters) {
  const genders = characters.map(character => {
    return character.gender;
  });

  return [...new Set(genders)];
}

function getSortedCharacters(characters, sort) {
  const sortOrder = sort.order;
  const sortBy = sort.field;

  if (sortOrder === null && sortBy === null) {
    return characters;
  }

  const sortedCharacters = [...characters].sort((a, b) => {
    if (sortBy === "height") {
      return Number(a.height) - Number(b.height);
    } else {
      return a[sortBy].localeCompare(b[sortBy]);
    }
  });

  if (sortOrder === "desc") {
    sortedCharacters.reverse();
  }

  return sortedCharacters;
}

function CharacterListTable(props) {
  const [characters, setCharacters] = React.useState({
    isLoading: true,
    error: false,
    data: []
  });
  const [sort, setSort] = React.useState({ field: null, order: null });
  const [selectedGender, setSelectedGender] = React.useState(null);

  React.useEffect(() => {
    // reset gender when selected movie changes
    setSelectedGender(null);

    setCharacters({
      data: [],
      isLoading: true,
      error: false
    });

    fetchCharacters(props.selectedMovie.characters)
      .then(characters => {
        setCharacters({
          data: characters,
          isLoading: false,
          error: false
        });
      })
      .catch(err => {
        setCharacters({
          data: [],
          isLoading: false,
          error: true
        });
      });
  }, [props.selectedMovie.episode_id]);

  function handleSortBy(field) {
    if (sort.field === field && sort.order === "asc") {
      setSort({ field, order: "desc" });
    } else {
      setSort({ field, order: "asc" });
    }
  }

  if (characters.isLoading) {
    return <div>Loading Characters...</div>;
  }

  if (characters.error) {
    return (
      <div>Unexpected error has occured while fetching the Characters!</div>
    );
  }

  const sortedCharacters = getSortedCharacters(characters.data, sort);
  const charactersToShow =
    selectedGender === null
      ? sortedCharacters
      : sortedCharacters.filter(character => {
          return character.gender === selectedGender;
        });

  return (
    <div>
      <GenderDropdown
        selectedGender={selectedGender}
        genders={getAllGenders(characters.data)}
        onChange={setSelectedGender}
      />
      <div className="character-list-table">
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSortBy("name")}>Name</th>
              <th onClick={() => handleSortBy("gender")}>Gender</th>
              <th onClick={() => handleSortBy("height")}>Height</th>
            </tr>
          </thead>
          <tbody>
            {charactersToShow.map(character => {
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
              <td>Total: {charactersToShow.length} </td>
              <td></td>
              <td>Sum: {getTotalHeight(charactersToShow)} </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

CharacterListTable.propTypes = {
  selectedMovie: PropTypes.shape(moviePropTypes).isRequired
};

export default CharacterListTable;
