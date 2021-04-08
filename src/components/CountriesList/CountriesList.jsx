import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import ListItems from "./ListItems/ListItems";
import CountriesSearch from "./CountriesSearch/CountriesSearch";
import CategorySwitcher from "./CategorySwitcher/CategorySwitcher";
import Modal from "../Modal/Modal";
import { CommonContext } from "../../contexts";
import "./_CountriesList.scss";

export default function CountriesList({ changeIndicator, setCurrentCountry }) {
  const { statisticsData } = useContext(CommonContext);

  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    setFilteredCountries(statisticsData.Countries);
  }, [statisticsData.Countries]);

  const filteringCountries = (filter) => {
    setFilteredCountries(
      statisticsData.Countries.filter((item) =>
        item.Country.toLowerCase().includes(filter.toLowerCase())
      )
    );
    document.querySelector(".search-bar").value = filter;
  };

  const mainListBlock = (
    <div className="countries-list__main">
      <CountriesSearch filteringCountries={filteringCountries} />
      <ListItems
        countries={filteredCountries}
        setCurrentCountry={setCurrentCountry}
      />
      <CategorySwitcher changeIndicator={changeIndicator} />
    </div>
  );

  return (
    <div className="countries-list">
      <div className="countries-list__header">
        <span>Countries list</span>
        <Modal
          filteringCountries={filteringCountries}
          modalObj={<div className="list-modal">{mainListBlock}</div>}
        />
      </div>
      {mainListBlock}
    </div>
  );
}

CountriesList.propTypes = {
  changeIndicator: PropTypes.func.isRequired,
  setCurrentCountry: PropTypes.func.isRequired,
};
