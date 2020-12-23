import React from 'react';

const numberPeople = 100000;

export default function MarkerStatistic({ currentCountry, currentPopulation, selectedCategory }) {
  if(selectedCategory === 'total'){
    return(
      <div>
        <div>Cases: { currentCountry.TotalConfirmed }</div>
        <div>Deaths: { currentCountry.TotalDeaths }</div>
        <div>Recovered: { currentCountry.TotalRecovered }</div>
      </div>
    );   
  } else if(selectedCategory === 'oneDay'){

    return(
      <div>
        <div>Cases: { currentCountry.NewConfirmed }</div>
        <div>Deaths: { currentCountry.NewDeaths }</div>
        <div>Recovered: { currentCountry.NewRecovered }</div>
      </div>
    );   
  } else if(selectedCategory === 'total100'){

    return(
      <div>
        <div>Cases: {
          Math.round((currentCountry.TotalConfirmed / currentPopulation.population) * numberPeople)
        }</div>
        <div>Deaths: {
          Math.round((currentCountry.TotalDeaths / currentPopulation.population) * numberPeople)
        }</div>
        <div>Recovered: {
          Math.round((currentCountry.TotalRecovered / currentPopulation.population) * numberPeople)
        }</div>
      </div>
    );   
  } else if(selectedCategory === 'oneDay100'){

    return(
      <div>
        <div>Cases: {
          Math.round((currentCountry.NewConfirmed / currentPopulation.population) * numberPeople)
        }</div>
        <div>Deaths: {
          Math.round((currentCountry.NewDeaths / currentPopulation.population) * numberPeople)
        }</div>
        <div>Recovered: {
          Math.round((currentCountry.NewRecovered / currentPopulation.population) * numberPeople)
        }</div>
      </div>
    );   
  }
}