import React, { useEffect, useState, useContext } from "react";
import { PropTypes } from "prop-types";
import StatisticItems from "./StatisticItems/StatisticItems";
import StatisticSwitcher from "./StatisticSwitcher/StatisticSwitcher";
import Modal from "../Modal/Modal";
import { CommonContext } from "../../contexts";
import "./_CountryStatistics.scss";

export default function CountryStatistics({
  currentCountryName,
  currentCountryCode,
  selectCategory,
}) {
  const { statisticsData, population, selectedCategory } = useContext(
    CommonContext
  );

  const [Confirmed, setConfirmed] = useState(0);
  const [Deaths, setDeaths] = useState(0);
  const [Recovered, setRecovered] = useState(0);
  const [lastDate, setLastDate] = useState([]);

  function setStatistic(confirmed, deaths, recovered) {
    setConfirmed(confirmed);
    setDeaths(deaths);
    setRecovered(recovered);
  }

  useEffect(() => {
    if (currentCountryCode === "Global") {
      setStatistic(
        statisticsData.Global.TotalConfirmed,
        statisticsData.Global.TotalDeaths,
        statisticsData.Global.TotalRecovered
      );
    } else {
      const country = statisticsData.Countries.find(
        (elem) => elem.CountryCode === currentCountryCode
      );
      const countryPopulation = population.find(
        (elem) => elem.alpha2Code === currentCountryCode
      ).population;
      const numberPeople = 100000;

      if (selectedCategory === "total") {
        setStatistic(
          country.TotalConfirmed,
          country.TotalDeaths,
          country.TotalRecovered
        );
      } else if (selectedCategory === "total100") {
        setStatistic(
          Math.round(
            (country.TotalConfirmed / countryPopulation) * numberPeople
          ),
          Math.round((country.TotalDeaths / countryPopulation) * numberPeople),
          Math.round(
            (country.TotalRecovered / countryPopulation) * numberPeople
          )
        );
      } else if (selectedCategory === "oneDay") {
        const countryDate = new Date(country.Date);

        setLastDate(`
        ${countryDate.getDate()} /
        ${countryDate.getMonth()} /
        ${countryDate.getFullYear()}
        `);

        setStatistic(
          country.NewConfirmed,
          country.NewDeaths,
          country.NewRecovered
        );
      } else if (selectedCategory === "oneDay100") {
        const countryDate = new Date(country.Date);

        setLastDate(`
        ${countryDate.getDate()} /
        ${countryDate.getMonth()} /
        ${countryDate.getFullYear()}
        `);

        setStatistic(
          Math.round((country.NewConfirmed / countryPopulation) * numberPeople),
          Math.round((country.NewDeaths / countryPopulation) * numberPeople),
          Math.round((country.NewRecovered / countryPopulation) * numberPeople)
        );
      }
    }
  }, [statisticsData, currentCountryCode, population, selectedCategory]);

  const statisticsBlock = (
    <div className="main-block">
      <div className="country-statistics__top">
        <StatisticSwitcher selectCategory={selectCategory} type="day" />
        <div className="country-block">
          {currentCountryName === "Global" ? null : (
            <img
              className="country-flag"
              src={`https://www.countryflags.io/${currentCountryCode}/flat/32.png`}
              alt="flag"
            />
          )}
          <span className="country-title">{currentCountryName}</span>
        </div>
        <StatisticSwitcher selectCategory={selectCategory} type="num" />
      </div>
      <StatisticItems
        Confirmed={Confirmed}
        Deaths={Deaths}
        Recovered={Recovered}
      />
    </div>
  );

  return (
    <div className="country-statistics">
      <div className="country-statistics__header">
        {selectedCategory === "oneDay" || selectedCategory === "oneDay100" ? (
          <div className="statistic-date">
            <span>{lastDate}</span>
          </div>
        ) : null}

        <span>Countries statistics</span>

        <Modal
          modalObj={<div className="statistics-modal">{statisticsBlock}</div>}
        />
      </div>
      {statisticsBlock}
    </div>
  );
}

CountryStatistics.propTypes = {
  currentCountryName: PropTypes.string.isRequired,
  currentCountryCode: PropTypes.string.isRequired,
  selectCategory: PropTypes.func.isRequired,
};
