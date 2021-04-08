import React, { useState, useEffect } from "react";
import {
  CountriesList,
  GlobalStatistics,
  CountryStatistics,
  Footer,
  Loader,
  Map,
  Graph,
} from "./components";
import { INDICATORS } from "./constants";
import { CommonProvider } from "./contexts";
import Requests from "./modules/data/data";
import "./App.scss";

let indicatorCounter = 0;

const request = new Requests();

export default function App() {
  const [indicator, setIndicator] = useState(INDICATORS[0]);
  const [population, setPopulation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentCountry, setCurrentCountry] = useState({
    name: "Global",
    code: "Global",
  });
  const [statisticsData, setStatisticsData] = useState({
    Global: {},
    Countries: [],
  });
  const [selectedCategory, selectCategory] = useState("total");

  useEffect(() => {
    setStatisticsData(request.getSummary());

    request
      .getPopulation()
      .then((data) => {
        setPopulation(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const changeIndicator = (num) => {
    if (num === 1) {
      if (indicatorCounter === INDICATORS.length - 1) {
        indicatorCounter = 0;
        setIndicator(INDICATORS[indicatorCounter]);
        return;
      }
      indicatorCounter += 1;
      setIndicator(INDICATORS[indicatorCounter]);
      return;
    }
    if (indicatorCounter === 0) {
      indicatorCounter = INDICATORS.length - 1;
      setIndicator(INDICATORS[indicatorCounter]);
      return;
    }
    indicatorCounter -= 1;
    setIndicator(INDICATORS[indicatorCounter]);
  };

  return loading ? (
    <Loader />
  ) : (
    <CommonProvider
      value={{
        statisticsData,
        population,
        selectedCategory,
        currentCountry,
        indicator,
      }}
    >
      <div className="App">
        <div className="main">
          <div className="left-section">
            <Map selectCategory={selectCategory} />
          </div>
          <div className="right-section">
            <div className="right-section__top">
              <GlobalStatistics setCurrentCountry={setCurrentCountry} />
              <CountriesList
                changeIndicator={changeIndicator}
                setCurrentCountry={setCurrentCountry}
              />
            </div>
            <div className="right-section__middle">
              <CountryStatistics
                currentCountryName={currentCountry.name}
                currentCountryCode={currentCountry.code}
                selectCategory={selectCategory}
              />
            </div>
            <div className="right-section__bottom">
              <Graph />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </CommonProvider>
  );
}
