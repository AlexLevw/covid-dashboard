import React, { useRef, memo } from "react";
import { PropTypes } from "prop-types";
import "./_CountriesSearch.scss";

function CountriesSearch({ filteringCountries }) {
  const inputRef = useRef();

  const onSearch = (e) => filteringCountries(e.target.value);
  function clearSearch() {
    filteringCountries("");
    inputRef.current.value = "";
  }

  return (
    <div className="countries-search">
      <input
        className="search-bar"
        ref={inputRef}
        onKeyUp={onSearch}
        type="text"
        placeholder="search for a countries"
      />
      <button className="clear-btn" onClick={clearSearch} type="button">
        <span>clear</span>
      </button>
    </div>
  );
}

CountriesSearch.propTypes = {
  filteringCountries: PropTypes.func.isRequired,
};

export default memo(CountriesSearch);
