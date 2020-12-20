import React, { useEffect, useState } from 'react';
import ListItems from './ListItems/ListItems';
import CountriesSearch from './CountriesSearch/CountriesSearch';
import CategorySwitcher from './CategorySwitcher/CategorySwitcher';
import Modal from '../Modal/Modal';
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
    document.querySelector('.search-bar').value = filter;
  }

  return (
    <div className="countries-list">
      <div className="countries-list__header">
        <span>Countries list</span>
          {/* Modal window */}
          <Modal filteringCountries={ filteringCountries } modalObj={ <div className="list-modal">
            <CountriesSearch filteringCountries={ filteringCountries } />
            <ListItems
              indicator={ props.indicator }
              countries={ filteredCountries }
              currentCountry={ props.currentCountry }
              setCurrentCountry={ props.setCurrentCountry }
            />
            <CategorySwitcher indicator={ props.indicator } changeIndicator={ props.changeIndicator }/>
          </div>
          }/>
      </div>
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