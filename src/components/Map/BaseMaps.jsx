import React, { useContext } from "react";
import { PropTypes } from "prop-types";
import { CommonContext } from "../../contexts";

export default function BaseMap({ selectCategory }) {
  const { selectedCategory } = useContext(CommonContext);

  function handleOnChange(e) {
    selectCategory(e.currentTarget.value);
  }

  return (
    <div className="base-maps-container">
      <select onChange={handleOnChange} value={selectedCategory}>
        <option value="total">All Population </option>
        <option value="oneDay">Last Day</option>
        <option value="total100">All Cases per 100 000 people</option>
        <option value="oneDay100">Daily Cases per 100 000 people</option>
      </select>
    </div>
  );
}

BaseMap.propTypes = {
  selectCategory: PropTypes.func.isRequired,
};
