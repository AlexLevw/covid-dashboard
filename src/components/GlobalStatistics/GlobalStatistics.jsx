import React, { useEffect, useState, useContext } from "react";
import { PropTypes } from "prop-types";
import GlobalItem from "./GlobalItem/GlobalItem";
import { CommonContext } from "../../contexts";
import "./_GlobalStatistics.scss";

export default function GlobalStatistics({ setCurrentCountry }) {
  const { statisticsData } = useContext(CommonContext);

  const [Confirmed, setConfirmed] = useState(0);
  const [Deaths, setDeaths] = useState(0);
  const [Recovered, setRecovered] = useState(0);

  function handleOnClick() {
    setCurrentCountry({ name: "Global", code: "Global" });
  }

  useEffect(() => {
    setConfirmed(statisticsData.Global.TotalConfirmed);
    setDeaths(statisticsData.Global.TotalDeaths);
    setRecovered(statisticsData.Global.TotalRecovered);
  }, [statisticsData]);

  return (
    <button className="global-statistics" onClick={handleOnClick} type="button">
      <span className="global-statistics__title">Global Statistics</span>
      <div className="global-statistics__list">
        <GlobalItem label="Cases" numbers={Confirmed} />
        <GlobalItem label="Deaths" numbers={Deaths} />
        <GlobalItem label="Recovered" numbers={Recovered} />
      </div>
    </button>
  );
}

GlobalStatistics.propTypes = {
  setCurrentCountry: PropTypes.func.isRequired,
};
