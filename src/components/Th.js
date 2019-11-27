import React from "react";
import PropTypes from "proptypes";
import { ChevronDown, ChevronUp } from "react-feather";

export function Th(props) {
  let sortIcon = null;
  if (props.sort.field === props.field) {
    sortIcon =
      props.sort.order === "asc" ? (
        <ChevronDown height="16" />
      ) : (
        <ChevronUp height="16" />
      );
  }
  return (
    <th className={props.className} onClick={() => props.onClick(props.field)}>
      {props.children} {sortIcon}
    </th>
  );
}

Th.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  field: PropTypes.string.isRequired,
  sort: PropTypes.shape({
    field: PropTypes.string,
    order: PropTypes.string
  }).isRequired,
  onClick: PropTypes.func.isRequired
};
