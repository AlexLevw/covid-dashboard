import React, { Component } from 'react';
import './_CountriesList.scss';
import ListItems from './ListItems/ListItems';
import CountriesSearch from './CountriesSearch/CountriesSearch';
import CategorySwitcher from './CategorySwitcher/CategorySwitcher';
import Requests from '../../modules/data/data';

const request = new Requests();

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
    request.getSummary()
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