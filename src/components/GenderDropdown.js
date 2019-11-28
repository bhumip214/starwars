import React from "react";
import PropTypes from "proptypes";
import { abbreviateGenders } from "../utils/abbreviateGenders";

function GenderDropdown(props) {
  const genderAbbreviation = abbreviateGenders(props.genders);
  return (
    <div>
      <select
        value={props.selectedGender || "null"}
        onChange={e => {
          const value = e.target.value;
          props.onChange(value === "null" ? null : value);
        }}
      >
        <option value="null">All Genders</option>
        <option disabled="disabled">--------------------------</option>
        {props.genders.map(gender => {
          return (
            <option key={gender} value={gender}>
              {gender.toUpperCase()} ({genderAbbreviation[gender]})
            </option>
          );
        })}
      </select>
    </div>
  );
}

GenderDropdown.propTypes = {
  selectedGender: PropTypes.string,
  genders: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired
};

export default GenderDropdown;
