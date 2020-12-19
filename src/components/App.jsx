/* eslint-disable array-callback-return */
import React, { useEffect } from "react";

import Graph from "./Chart/Chart";
import DataCovid19 from "../covid-dashboard/modules/data/data.js";

// const Li = ({ Country }) => {
//   return <li>{Country}</li>;
// };

function App() {
  const dataCovid19 = new DataCovid19();

  const countryTotal = useEffect(() => {
    const countryTotal = dataCovid19.getCountryTotal().then((result) => {
      return result;
    });
  });
  const list = countryTotal.map((el) => <li>${el}</li>);

  return (
    <div className="wrapper">
      <p>{`Graph`}</p>
      <ul></ul>
      <Graph />
    </div>
  );
}
export default App;
