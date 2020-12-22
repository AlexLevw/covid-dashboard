import React, { useEffect, useState } from 'react';
import StatisticItems from './StatisticItems/StatisticItems';
import StatisticSwitcher from './StatisticSwitcher/StatisticSwitcher';
import Modal from '../Modal/Modal';
import './_CountryStatistics.scss';

export default function CountryStatistics(
  { currentCountryName, currentCountryCode, statisticsData, population }
  ){
  const [Confirmed, setConfirmed] = useState(0);
  const [Deaths, setDeaths] = useState(0);
  const [Recovered, setRecovered] = useState(0);
  const [isAllTime, setIsAllTime] = useState(true);
  const [isAllPopulation, setIsAllPopulation] = useState(true);
  const [lastDate, setLastDate] = useState([]);

  function setStatistic(confirmed, deaths, recovered) {
    setConfirmed(confirmed);
    setDeaths(deaths);
    setRecovered(recovered);
  }
  
  useEffect(() => {
    if(currentCountryCode === 'Global') {
      setStatistic(
        statisticsData.Global.TotalConfirmed,
        statisticsData.Global.TotalDeaths,
        statisticsData.Global.TotalRecovered
      );
    } else {
      const country = statisticsData.Countries.find((elem) => elem.CountryCode === currentCountryCode);
      const countryPopulation = population.find((elem) => elem.alpha2Code === currentCountryCode).population;
      const numberPeople = 100000;
      
      if(isAllTime) {
        if(isAllPopulation) {
          setStatistic(country.TotalConfirmed, country.TotalDeaths, country.TotalRecovered);
        } else {
          setConfirmed(
            Math.round((country.TotalConfirmed / countryPopulation) * numberPeople)
          );
          setDeaths(
            Math.round((country.TotalDeaths / countryPopulation) * numberPeople)
          );
          setRecovered(
            Math.round((country.TotalRecovered / countryPopulation) * numberPeople)
          );
        }
      } else {
        const countryDate = new Date(country.Date);
        setLastDate(`
        ${countryDate.getDate()} /
        ${countryDate.getMonth()} /
        ${countryDate.getFullYear()}
        `);
        
        if(isAllPopulation) {
          setConfirmed(country.NewConfirmed);
          setDeaths(country.NewDeaths);
          setRecovered(country.NewRecovered);
        } else {
          setConfirmed(
            Math.round((country.NewConfirmed / countryPopulation) * numberPeople)
          );
          setDeaths(
            Math.round((country.NewDeaths / countryPopulation) * numberPeople)
          );
          setRecovered(
            Math.round((country.NewRecovered / countryPopulation) * numberPeople)
          );
        }
      }
    }
  }, [statisticsData, currentCountryCode, population, isAllTime, isAllPopulation]);

  return (
    <div className="country-statistics">
      <div className="country-statistics__header">
        <span>Countries statistics</span>

        {/* Modal window start*/}
        <Modal modalObj={
          <div className="statistics-modal">
            <div className="country-statistics__top">
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
            { !isAllTime ? <div className="statistic-date"><span>{ lastDate }</span></div> : null }
          </div>
        }/>
        {/* Modal window end */}

      </div>
      <div className="country-statistics__top">
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
      { !isAllTime ? <div className="statistic-date"><span>{ lastDate }</span></div> : null }
    </div>
  ); 
}