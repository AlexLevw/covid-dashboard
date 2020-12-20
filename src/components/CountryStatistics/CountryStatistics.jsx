import React, { useEffect, useState } from 'react';
import StatisticItems from './StatisticItems/StatisticItems';
import StatisticSwitcher from './StatisticSwitcher/StatisticSwitcher';
import './_CountryStatistics.scss';

export default function CountryStatistics(
  { currentCountryName, currentCountryCode, statisticsData, population }
  ){
  const [Confirmed, setConfirmed] = useState(0);
  const [Deaths, setDeaths] = useState(0);
  const [Recovered, setRecovered] = useState(0);
  const [isAllTime, setIsAllTime] = useState(true);
  const [isAllPopulation, setIsAllPopulation] = useState(true);
  
  useEffect(() => {
    if(currentCountryCode === 'Global') {
      setConfirmed(statisticsData.Global.TotalConfirmed);
      setDeaths(statisticsData.Global.TotalDeaths);
      setRecovered(statisticsData.Global.TotalRecovered);
    } else {
      const country = statisticsData.Countries.find((elem) => elem.CountryCode === currentCountryCode)
      if(isAllTime) {
        if(isAllPopulation) {
          setConfirmed(country.TotalConfirmed);
          setDeaths(country.TotalDeaths);
          setRecovered(country.TotalRecovered);
        } else {
          const countryPopulation = population.find((elem) => elem.name.includes(country.Country)).population;
          setConfirmed(
            ((country.TotalConfirmed / countryPopulation) * 100000).toFixed(4)
          );
          setDeaths(
            ((country.TotalDeaths / countryPopulation) * 100000).toFixed(4)
          );
          setRecovered(
            ((country.TotalRecovered / countryPopulation) * 100000).toFixed(4)
          );
        }
      } else {
        if(isAllPopulation) {
          setConfirmed(country.NewConfirmed);
          setDeaths(country.NewDeaths);
          setRecovered(country.NewRecovered);
        } else {
          const countryPopulation = population.find((elem) => elem.name.includes(country.Country)).population;
          setConfirmed(
            ((country.NewConfirmed / countryPopulation) * 100000).toFixed(4)
          );
          setDeaths(
            ((country.NewDeaths / countryPopulation) * 100000).toFixed(4)
          );
          setRecovered(
            ((country.NewRecovered / countryPopulation) * 100000).toFixed(4)
          );
        }
      }
    }
  }, [statisticsData, currentCountryCode, population, isAllTime, isAllPopulation]);

  return (
    <div className="country-statistics">
      <div className="country-statistics__header">
        <StatisticSwitcher
          setParam={ setIsAllTime }
          isParam={ isAllTime }
          titles={ ['All Time', 'Last Day'] }
        />
        <div className="country-block">
          {
            currentCountryName === 'Global' ? null
            : <img className="country-flag" src={ `https://www.countryflags.io/${currentCountryCode}/flat/32.png` } alt="flag"/>
          }
          <span className="country-title">{ currentCountryName }</span>
        </div>
        <StatisticSwitcher 
          setParam={ setIsAllPopulation }
          isParam={ isAllPopulation }
          titles={ ['All Population', '100,000 Population'] }
        />
      </div>
      <StatisticItems
        Confirmed={ Confirmed }
        Deaths={ Deaths }
        Recovered={ Recovered }
      />
    </div>
  ); 
}