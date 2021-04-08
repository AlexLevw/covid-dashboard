import React, { useState, useEffect, useContext, memo } from "react";
import { Bar } from "react-chartjs-2";
import Modal from "../Modal/Modal";
import { CommonContext } from "../../contexts";
import "./Graph.scss";

const NUMBER_PEOPLE = 100000;

function Graph() {
  const {
    statisticsData,
    population,
    indicator,
    selectedCategory,
  } = useContext(CommonContext);

  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const labels = [];
    const data = [];

    const sortCountries = statisticsData.Countries.sort((a, b) => {
      const aPopulation = population.find(
        (elem) => elem.alpha2Code === a.CountryCode
      );
      const bPopulation = population.find(
        (elem) => elem.alpha2Code === b.CountryCode
      );
      if (selectedCategory === "total") {
        return a[indicator.api] - b[indicator.api];
      }

      if (selectedCategory === "total100") {
        return Math.round(
          (a.TotalConfirmed / aPopulation.population) * NUMBER_PEOPLE -
            -Math.round(
              (b.TotalConfirmed / bPopulation.population) * NUMBER_PEOPLE
            )
        );
      }

      if (selectedCategory === "oneDay") {
        return a.NewConfirmed - b.NewConfirmed;
      }

      if (selectedCategory === "oneDay100") {
        return (
          Math.round(
            (a.NewConfirmed / aPopulation.population) * NUMBER_PEOPLE
          ) -
          -Math.round((b.NewConfirmed / bPopulation.population) * NUMBER_PEOPLE)
        );
      }
      return null;
    }).slice(-(statisticsData.Countries.length / 2));

    sortCountries.forEach((el) => {
      let currentParam = null;

      if (selectedCategory === "total") {
        currentParam = el[indicator.api];
      } else if (selectedCategory === "total100") {
        const countryPopulation = population.find(
          (elem) => elem.alpha2Code === el.CountryCode
        );
        currentParam = Math.round(
          (el.TotalConfirmed / countryPopulation.population) * NUMBER_PEOPLE
        );
      } else if (selectedCategory === "oneDay") {
        currentParam = el.NewConfirmed;
      } else if (selectedCategory === "oneDay100") {
        const countryPopulation = population.find(
          (elem) => elem.alpha2Code === el.CountryCode
        );
        currentParam = Math.round(
          (el.NewConfirmed / countryPopulation.population) * NUMBER_PEOPLE
        );
      }

      data.push(currentParam);
      labels.push(el.Country);
    });

    setChartData({
      backgroundColor: "red",
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
    });

    setChartOptions({
      scaleShowVerticalLines: false,
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        xAxes: [
          {
            gridLines: {
              lineWidth: 0,
              color: "rgba(255,255,255,0)",
            },
            ticks: {
              display: false,
            },
          },
        ],
        yAxes: [
          {
            gridLines: {
              lineWidth: 0,
              color: "rgba(255,255,255,0)",
            },
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
      chartArea: {
        backgroundColor: "rgba(251, 85, 85, 0.4)",
      },
    });
  }, [statisticsData.Countries, indicator, population, selectedCategory]);

  return (
    <div className="chart-block">
      <Modal modalObj={<Bar data={chartData} options={chartOptions} />} />
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
}

export default memo(Graph);
