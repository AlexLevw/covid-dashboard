import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import './index.scss'


import { MapContainer, Popup, Marker, TileLayer, useMap, GeoJSON } from "react-leaflet";
import { createControlComponent } from '@react-leaflet/core';
import L  from 'leaflet';
import Basemap from './Basemaps';
import MarkerClusterGroup from 'react-leaflet-markercluster';

import icon from './circle.png';


import dataJSON from './country.js'

async function request(url) {
  const response = await fetch(url, {method: "GET",redirect: "follow"});

  if (!response.ok) {
    throw new Error(
      `Could not fetch Data Voice ${url}, received ${response.status}`,
    );
  }
  const result = await response.json();

  return result;
}

const stateAPI = "https://api.covid19api.com/"

const summary =  request(`${stateAPI}summary`).then( ( data ) => {

const countryAll = data.Countries;
  for (var i = 0; i < dataJSON.length; i++) {
    let result = countryAll.find((item) => {
      return item['CountryCode'] == dataJSON[i]['alpha2']});
        if(!(typeof result === 'undefined')){
          dataJSON[i]['Slug'] = result["Slug"]
          dataJSON[i]['TotalConfirmed'] = result["TotalConfirmed"]
          dataJSON[i]['TotalDeaths'] = result["TotalDeaths"]
          dataJSON[i]['NewRecovered'] = result["NewRecovered"]
        }
      }
      return dataJSON;
    });

// console.log(summary);


  const listCountry = dataJSON.map(( item ) => {
    const myIcon = L.icon({
      iconUrl: icon,
      iconSize: [10,10],
      popupAnchor: [-10, -10],
    });

    summary.then( ( summaruData ) => {
      let result = summaruData.find((i) => {
        return i['CountryCode'] == item['alpha2']});
          if(!(typeof result === 'undefined')){
            item['Slug'] = result["Slug"]
            item['TotalConfirmed'] = result["TotalConfirmed"]
            item['TotalDeaths'] = result["TotalDeaths"]
            item['NewRecovered'] = result["NewRecovered"]
          }
      })

    let ill = item['TotalConfirmed'];
    let recover = item['NewRecovered'];
    let died = item['TotalDeaths'];


    const pos = [item.latitude, item.longitude];

    return (
      <Marker position = { pos }  icon={myIcon} key={ item.numeric }>
        <Popup>
          { item.country } <br />
          Заболевшие: {ill}<br />
          Выздоровевшие: {recover}<br />
          Умершие: {died}
        </Popup>
      </Marker>
    )
  })

const MyMap = ( ) => {

const onBMChange = (bm) => {
    onChange(bm)
  }

const [basemap, onChange] = useState('total');
const center = [39, 22];

useEffect ( (e) => {
console.log(basemap);
}, [basemap])


    return (
      <MapContainer zoom={2} center={center} maxZoom={18}>
        <TileLayer url={'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png' }/>
        <Basemap basemap={ basemap } onChange={ onBMChange }/>
          { listCountry }
      </MapContainer>
    );



}

export default MyMap;
