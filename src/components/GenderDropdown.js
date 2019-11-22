import React from "react";
import PropTypes from "proptypes";

function GenderDropdown(props) {
  return (
    <div>
      <select value={props.selectedGender || "null"} onChange={props.onChange}>
        <option value="null">All Genders</option>
        <option disabled="disabled">--------------------------</option>
        {props.genders.map(gender => {
          return (
            <option key={gender} value={gender}>
              {gender.toUpperCase()}
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
