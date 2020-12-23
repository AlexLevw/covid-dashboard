import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import Modal from '../Modal/Modal';
import './Chart.scss';

export default function Graph({ statisticsData, indicator }) {
  const[chartData, setChartData] = useState({});
  const[chartOptions, setChartOptions] = useState({});
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    let l = [];
    let d = [];
    const sortCountries = statisticsData.Countries.sort((a, b) => {
      return a[indicator.api] - b[indicator.api];
    }).slice(-(statisticsData.Countries.length / 2));

    sortCountries.forEach(el => {
      l.push(el.Country);
      d.push(el[indicator.api])
    })

    setLabels(l);
    setData(d);

    setChartData({
      backgroundColor: 'red',
      labels: labels,
      display: false,
      datasets: [
        {
          label: `Global ${indicator.title} by Countries`,
          data: data,
          backgroundColor: "rgba(160,34,36,1)",
          strokeColor: "brown",
          borderWidth: 1,
        },
      ],
    })

    setChartOptions({
      scaleShowVerticalLines: false,
      responsive: true,
      maintainAspectRatio: false,
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
      chartArea: {
				backgroundColor: 'rgba(251, 85, 85, 0.4)'
			}
    })
  },[statisticsData.Countries, data, indicator, labels])



  return (
  <div className="chart-block">
    <Modal modalObj={
      <Bar
      data={chartData}
      options={chartOptions}
      />
    } />
    <Bar
      data={chartData}
      options={chartOptions}
    />
  </div>
  );
};;
