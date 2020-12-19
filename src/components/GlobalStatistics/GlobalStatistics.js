import React, {useEffect, useState} from 'react';
import GlobalItem from './GlobalItem/GlobalItem';
import './_GlobalStatistics.scss';

function sendRequest(url) {
  return fetch(url).then((response) => response.json());
}

export default function GlobalStatistics() {
  const [Confirmed, setConfirmed] = useState(0);
  const [Deaths, setDeaths] = useState(0);
  const [Recovered, setRecovered] = useState(0);

  useEffect(() => {
    sendRequest('https://api.covid19api.com/summary')
  .then(data => {
    setConfirmed(data.Global.TotalConfirmed);
    setDeaths(data.Global.TotalDeaths);
    setRecovered(data.Global.TotalRecovered);
  }) 
  .catch(err => {
    console.log(err);
  });
  }, []);
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