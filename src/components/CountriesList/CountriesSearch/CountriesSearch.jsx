import React from 'react';
import './_CountriesSearch.scss';

export default function CountriesSearch({ filteringCountries }) {
  
  function onSearch(e) {
    filteringCountries(e.target.value);
  }

  function clearSearch() {
    filteringCountries('');
    document.querySelector('.search-bar').value = '';
  }

  return (
    <div className="countries-search">
      <input 
        className="search-bar"
        onKeyUp={ onSearch }
        type="text"
        name="searchBar"
        placeholder="search for a countries"
      />
      <div className="clear-btn" onClick={ clearSearch }>
        <span>clear</span>
      </div>
    </div>
  );
}