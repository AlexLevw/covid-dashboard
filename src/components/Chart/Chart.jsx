import React, { useRef, useState, useEffect, useCallback } from "react";

// import Chart from "chart.js";
import { Chart ,Bar } from "react-chartjs-2";

import ApiDataCovid19 from "../../modules/data/data";
import './Chart.scss';



const Graph = () => {

  const[api, setApi] = useState(ApiDataCovid19);
  const[labelsCountry, setlabelsCountry] = useState([]);
  const[chartData, setChartData] = useState({});
  const[chartOptions, setChartOptions] = useState({});
  
  const confChart = () => {
    console.log(Chart.default);
    const labels =[]
    const data = []
    setApi(ApiDataCovid19);
    api.getData(`https://api.covid19api.com/summary`).then(el => {
      el.Countries.forEach(el => {
        labels.push(el.Country);
        if(Math.floor(el.TotalRecovered / 10000)) {
          data.push(Math.floor(el.TotalRecovered / 10000))
        }
      })
    });	
    let sortData = data.sort((a,b) => a - b);
    setChartData({
      backgroundColor: 'red',
      labels: labels,
      display: false,
      datasets: [
        {
          label: 'Global Cases by Countrys',
          data: sortData,
          backgroundColor: "rgba(160,34,36,1)",
          strokeColor: "brown",
          borderWidth: 1,
        },
      ],
    })

    setChartOptions({
      scaleShowVerticalLines: false,
      scales: {
        
        xAxes:[{
          gridLines: {
            lineWidth: 0,
            color: "rgba(255,255,255,0)"
        },
          ticks: {
            display: false,
          }
        }],
        yAxes: [{
          gridLines: {
            lineWidth: 0,
            color: "rgba(255,255,255,0)"
        },
            ticks: {
                beginAtZero: true,
            }
        }]
      },
      responsive:true,
      chartArea: {
					backgroundColor: 'rgba(251, 85, 85, 0.4)'
				}
    })
  }


  useEffect(() => {
    confChart();
  },[])

  return (
    <Bar
      data={chartData}
      options={chartOptions}
    />
  );
};;

export default Graph;
