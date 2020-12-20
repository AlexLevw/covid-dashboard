import React, {useEffect, useState} from 'react';
import GlobalItem from './GlobalItem/GlobalItem';
import './_GlobalStatistics.scss';

export default function GlobalStatistics({ GlobalData }) {
  const [Confirmed, setConfirmed] = useState(0);
  const [Deaths, setDeaths] = useState(0);
  const [Recovered, setRecovered] = useState(0);

  useEffect(() => {
    setConfirmed(GlobalData.TotalConfirmed);
      setDeaths(GlobalData.TotalDeaths);
      setRecovered(GlobalData.TotalRecovered);
  }, [GlobalData]);
  return (
  <div className="global-statistics">
    <span className="global-statistics__title">Global Statistics</span>
    <div className="global-statistics__list">
      <GlobalItem label="Cases" numbers={ Confirmed } />
      <GlobalItem label="Deaths" numbers={ Deaths } />
      <GlobalItem label="Recovered" numbers={ Recovered } />
    </div>
  </div>
  )
}