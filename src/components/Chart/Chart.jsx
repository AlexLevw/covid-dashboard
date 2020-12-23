import React, { useState, useEffect } from "react";
import { Chart, Bar } from "react-chartjs-2";
import Modal from '../Modal/Modal';
import './Chart.scss';

export default function Graph({ statisticsData }) {
  const[chartData, setChartData] = useState({});
  const[chartOptions, setChartOptions] = useState({});
  
  const confChart = () => {
    console.log(Chart.default);
    const labels =[]
    const data = []
    statisticsData.Countries.forEach(el => {
      labels.push(el.Country);
      if(Math.floor(el.TotalRecovered / 10000)) {
        data.push(Math.floor(el.TotalRecovered / 10000))
      }
    })
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
  }


  useEffect(() => {
    confChart();
  },[])



  return (
  <div style={{width: '100%', height: '100%'}}>
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
