import React, { useRef, useState, useEffect, useCallback } from "react";

import Chart from "chart.js";
import DataCovid19 from "../../modules/data/data";

const Graph = () => {
  const canvas = useRef(null);
  
  const [data, setData] = useState(new DataCovid19());

  const getCountries = () => {
    return data.getCountryTotal();
  };

  const [dateState, setDateState] = useState(null);
  const useRequest = (request) => {

    useEffect(() => {
      let cancelled = false;

      request().then((data) => !cancelled && setDateState(data));
      return () => (cancelled = true);
    }, [request]);

    return dateState;
  };

  const useCounties = () => {
    const request = useCallback(() => getCountries(), []);
    return useRequest(request);
  };
  
  useCounties();

  useEffect(() => {
    const ctx = canvas.current.getContext("2d");
    console.log(dateState);
    new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Jan", "Feb", "March"],
        datasets: [
          {
            label: "Sales",
            data: [86, 95, 91],
          },
          {
            label: "Cost",
            data: [100, 200, 300],
          },
          {
            label: "month",
            data: [150, 1500, 100],
          },
        ],
      },
      options: {
        //Customize chart options
      },
    });
  }, [dataState]);
  

  return <canvas className="canvas" ref={canvas} />;
};

export default Graph;
