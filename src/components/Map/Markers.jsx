import React, { useState } from 'react';
import { Tooltip, Marker } from "react-leaflet";
import L  from 'leaflet';
import icon from '../../modules/assets/circle.svg';
import dataJSON from '../../modules/data/country.js';
import MarkerStatistic from './MarkerStatistic/MarkerStatistic';

  // function changeIcon(size) {
  //   const newSize  = isNaN(size) ? 0 : size + 10;
  //   onChangeIcon(
  //     L.divIcon({
  //     shadowUrl: icon,
  //     shadowSize: [12, 12],
  //     iconSize: [newSize, newSize],
  //     popupAnchor: [-10, -10],
  //   }))
  // }

const myIconStart = L.divIcon({
  shadowUrl: icon,
  shadowSize: [12, 12],
  iconSize: [10, 10],
  popupAnchor: [-10, -10],
})

export default function Markers({ statisticsData, population, selectedCategory }){
  const [myIcon] = useState(myIconStart);
  
  const markers = dataJSON.map(( item ) => {
    const currentCountry = statisticsData.Countries.find((country) => {
      return country.CountryCode === item.alpha2;
    });
    const position = [item.latitude, item.longitude];
    const currentPopulation = !currentCountry ? null
      :population.find((item) => {
        return item.alpha2Code === currentCountry.CountryCode;
      });
    return (
      <Marker position = { position }  icon={ myIcon } key= { item.numeric } kind={ 'total' } >
        <Tooltip>
          <div className="flag-for-popUp">
            <img src={ `https://www.countryflags.io/${item.alpha2}/flat/32.png` } alt="flag"/>  { item.country }
          </div>
          <br />
          {currentCountry === undefined
            ?
            <div>No Data!</div>
            :
            <MarkerStatistic
              currentCountry={ currentCountry }
              currentPopulation={ currentPopulation }
              selectedCategory={ selectedCategory }
            />
          }
        </Tooltip>
      </Marker>
    )
  });

  return (
    <div>{ markers }</div>
  )
}
