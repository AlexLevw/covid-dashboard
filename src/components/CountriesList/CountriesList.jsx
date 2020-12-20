import React, { useEffect, useState } from 'react';
import ListItems from './ListItems/ListItems';
import CountriesSearch from './CountriesSearch/CountriesSearch';
import CategorySwitcher from './CategorySwitcher/CategorySwitcher';
import './_CountriesList.scss';

export default function CountriesList(props) {
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    setFilteredCountries(props.statisticsData.Countries);
  }, [props.statisticsData.Countries]);

  const filteringCountries = (filter) => {
    setFilteredCountries(props.statisticsData.Countries.filter((item) => {
      return item.Country.toLowerCase().includes(filter.toLowerCase());
    }));
  }

  return (
    <div className="countries-list">
      <CountriesSearch filteringCountries={ filteringCountries } />
      <ListItems
        indicator={ props.indicator }
        countries={ filteredCountries }
        currentCountry={ props.currentCountry }
        setCurrentCountry={ props.setCurrentCountry }
      />
      <CategorySwitcher indicator={ props.indicator } changeIndicator={ props.changeIndicator }/>
    </div>
  );
}