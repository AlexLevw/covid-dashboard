import React, { Component } from 'react';
import './_CountriesList.scss';
import ListItems from './ListItems';
import CountriesSearch from './CountriesSearch/CountriesSearch';
import CategorySwitcher from './CategorySwitcher/CategorySwitcher';

function sendRequest(url) {
  return fetch(url).then((response) => response.json());
}

export default class CountriesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: [],
      filteredCountries: []
    };
  }  

  setCountries = (value) => {
    this.setState({ countries: value });
  }

  setFilteredCountries = (value) => {
    this.setState({ filteredCountries: value });
  }

  filteringCountries = (filter) => {
    this.setFilteredCountries(this.state.countries.filter((item) => {
      return item.Country.toLowerCase().includes(filter.toLowerCase());
    }));
  }

  componentDidMount() {
    sendRequest('https://api.covid19api.com/summary')
    .then(data => {
      this.setCountries(data.Countries);
      this.setFilteredCountries(data.Countries);
    }) 
    .catch(err => {
      console.log(err);
    });
  }

  render() {
    return (
      <div className="countries-list">
        <CountriesSearch filteringCountries={ this.filteringCountries } />
        <ListItems indicator={ this.props.indicator } countries={ this.state.filteredCountries }/>
        <CategorySwitcher indicator={ this.props.indicator } setIndicator={ this.props.setIndicator }/>
      </div>
    );
  }
}