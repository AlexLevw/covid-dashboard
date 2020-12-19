import './index.scss'

import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';

// import CustomMarker from './marker';

import { MapContainer, Map, Popup, Marker, TileLayer, useMap } from "react-leaflet";
import { createControlComponent } from '@react-leaflet/core';
import L from 'leaflet';


import dataJSON from './country.js'

// const MyMap = ( props ) => {
//     // const data = dataJSON
//     return (
//       <button id="data" onClick >Hello!</button>
//     )
// }

const MyMap = (props) => {

  const position = [53, 28]
  const zoom = 2
  const listCountry = dataJSON.map(( item ) => {
    const nameCantry = "Беларусь"
    const ill = 23
    const recover = 22
    const died = 1

    const pos = [item.latitude,  item.longitude];
    return (
      <Marker position = { pos }
      onMouseOver={(e) => {
      e.target.openPopup();
      console.log("hello");
      }}
      onMouseOut={(e) => {
        e.target.closePopup();
      }}
      >
        <Popup>
          { item.country } <br />
          Заболевшие: {ill}<br />
          Выздоровевшие: {recover}<br />
          Умершие: {died}
        </Popup>
      </Marker>
    )
  })

  return (
    <MapContainer center={position}
    zoom={ zoom }
    scrollWheelZoom={false}
    zoomControl={true}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"

      />
      {listCountry}

    </MapContainer>
  );
};
export default MyMap;
