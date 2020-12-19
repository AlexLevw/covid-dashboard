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

// async function request(url) {
//   const response = await fetch(url, {method: "GET",redirect: "follow"});
//
//   if (!response.ok) {
//     throw new Error(
//       `Could not fetch Data Voice ${url}, received ${response.status}`,
//     );
//   }
//   const result = await response.json();
//
//   return result;
// }
//
// const stateAPI = "https://api.covid19api.com/"
//
// const summary = request(`${stateAPI}summary`).then( ( data ) =>{
//   console.log(data.Countries);
// });


const listCountry = dataJSON.map(( item ) => {

  const ill = 23
  const recover = 22
  const died = 1

  const pos = [item.latitude,  item.longitude];
  const requestContry = ( props ) => {
    console.log(this);
  }
  const myIcon = L.icon({
      iconUrl: icon,
      iconSize: [10,10],
      popupAnchor: [-10, -10],
  });

  return (
    <Marker position = { pos }  icon={myIcon} key={ item.numeric } onClick={ requestContry }>
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

const [basemap, onChange] = useState('dark');

const center = [39, 22];
const zoom = 2;

useEffect ( (e) => {

}, [basemap])

function basemapsTest(basemap) {
  const basemapsDict = {
    osm: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    alidadeSmooth: 'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png',
    dark:'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png',
    cycle: "https://dev.{s}.tile.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png",
  }
  return basemapsDict[basemap];
}

    return (
      <MapContainer zoom={zoom} center={center} maxZoom={18}>
        <TileLayer url={'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png' }/>
        <Basemap basemap={ basemap } onChange={ onBMChange }/>

          { listCountry }

      </MapContainer>
    );

}

export default MyMap;
