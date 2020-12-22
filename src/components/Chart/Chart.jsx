import React, { useRef, useState, useEffect, useCallback } from "react";

import Chart from "chart.js";
import { Bar } from "react-chartjs-2";
import DataCovid19 from "../../modules/data/data";

const api = new DataCovid19();

const Graph = () => {

  const [confChart, setConfChart] = useState({});
  const [arrayCountry, setCountry] = useState({});

  const configChart = () => {
   
    setConfChart({
        data: {
          labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
          datasets: [{
              label: '# of Votes',
              data: [12, 19, 3, 5, 2, 3],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          }
      }
    })
  }

  useEffect(() => {
    api.getSummary().then(data => setCountry(data));
 
  },[arrayCountry]);

  useEffect(() => {
    configChart();
  },[]);
  

  


  return (
    <Bar
      data={confChart}
      width={400}
      height={600}
      options={{ maintainAspectRatio: false }}
    />
  );
  
};

export default Graph;
