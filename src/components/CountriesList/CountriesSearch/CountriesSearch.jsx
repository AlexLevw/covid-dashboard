import React, { Component } from 'react';
import './_CountriesSearch.scss';

export default class CountriesSearch extends Component {
  
  onSearch = (e) => {
    this.props.filteringCountries(e.target.value);
  }

  clearSearch = () => {
    this.props.filteringCountries('');
  }

  render() {
    return (
      <div className="countries-search">
        <input 
          className="search-bar"
          onKeyUp={ this.onSearch }
          type="text"
          name="searchBar"
          placeholder="search for a countries"
        />
        <div className="clear-btn" onClick={ this.clearSearch }>
          <span>clear</span>
        </div>
      </div>
    );
  }
}