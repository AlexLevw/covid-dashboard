import React, { useState, useEffect } from 'react';
import CountriesList from './components/CountriesList/CountriesList';
import GlobalStatistics from './components/GlobalStatistics/GlobalStatistics';
import CountryStatistics from './components/CountryStatistics/CountryStatistics';
import Footer from './components/Footer/Footer';
import Loader from './components/Loader/Loader';
import Map from './components/Map/Map';
import Requests from './modules/data/data';
import './App.scss';

const indicators = [
  { title: 'Cases', api: 'TotalConfirmed' }, 
  { title: 'Deaths', api: 'TotalDeaths' },
  { title: 'Recovered', api: 'TotalRecovered' }
];

let indicatorCounter = 0;

const request = new Requests();

export default function App() {
  const [indicator, setIndicator] = useState(indicators[0]);
  const [population, setPopulation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentCountry, setCurrentCountry] = useState({
    name: 'Global',
    code: 'Global' 
  });
  const [statisticsData, setStatisticsData] = useState({
    Global: {},
    Countries: []
  });
  const [selectedCategory, selectCategory] = useState('total');

  useEffect(() => {
    setStatisticsData(request.getSummary());

    request.getPopulation()
    .then(data => {
      setPopulation(data);

    }) 
    .catch(err => {
      console.log(err);
    });

    setLoading(false);
  }, []);

  const changeIndicator = (num) => {
    if (num === 1) {
      if(indicatorCounter === indicators.length - 1) {
        indicatorCounter = 0;
      } else {
        indicatorCounter += 1;
      } 
    } else {
      if(indicatorCounter === 0) {
        indicatorCounter = indicators.length - 1;
      } else {
        indicatorCounter -= 1;
      }
    }
    setIndicator(indicators[indicatorCounter]);
  }

  return loading ? <Loader /> :
  (
    <div className="App">
      <div className="main">
      <div className="left-section">
        <Map 
          statisticsData={statisticsData }
          population={ population }
          selectedCategory={ selectedCategory }
          selectCategory={ selectCategory }
        />
      </div>
      <div className="right-section">
        <div className="right-section__top">
          <GlobalStatistics
            GlobalData={ statisticsData.Global }
            setCurrentCountry={ setCurrentCountry }
          />
          <CountriesList
            statisticsData={ statisticsData }
            indicator={ indicator }
            changeIndicator={ changeIndicator }
            currentCountry={ currentCountry }
            setCurrentCountry={ setCurrentCountry }
          />
        </div>
        <div className="right-section__middle">
          <CountryStatistics
            statisticsData={ statisticsData }
            currentCountryName={ currentCountry.name }
            currentCountryCode={ currentCountry.code }
            population={ population }
            selectedCategory={ selectedCategory }
            selectCategory={ selectCategory }
          />
        </div>
        <div className="right-section__bottom">
          
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
}
