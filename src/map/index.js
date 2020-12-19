import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import './index.scss'

import { MapContainer, Popup, Marker, TileLayer, useMap } from "react-leaflet";
import { createControlComponent } from '@react-leaflet/core';
import L from 'leaflet';
import Basemap from './Basemaps';

import dataJSON from './country.js'

const listCountry = dataJSON.map(( item ) => {
  const ill = 23
  const recover = 22
  const died = 1

  const pos = [item.latitude,  item.longitude];

  return (
    <Marker position = { pos }  key={ item.numeric }>
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
   // return basemap = bm;
}

let [basemap, onChange] = useState('dark');

const center = [39, 22];
const zoom = 2;

const basemapsDict = {
  osm: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  alidadeSmooth: 'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png',
  dark:'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png',
  cycle: "https://dev.{s}.tile.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png",
}

    return (
      <MapContainer zoom={zoom} center={center}>
        <TileLayer
            url ={ basemapsDict[basemap] } onChange={ onBMChange }
        />
        <Basemap basemap={ basemap } onChange={ onBMChange }/>
        { listCountry }
      </MapContainer>
    );

}

export default MyMap;
