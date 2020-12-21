import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import './index.scss'

import { MapContainer, Popup, Marker, TileLayer, useMap, GeoJSON } from "react-leaflet";
import { createControlComponent } from '@react-leaflet/core';
import L  from 'leaflet';
import Basemap from './Basemaps';
import ListCountry from './markers';

import dataJSON from './country.js'

const MyMap = ( ) => {

const center = [39, 22];
const [basemap, onChange] = useState('total');

useEffect ( (e) => {
  lCountry.map(( item ) => {
    onChangeKind(cangeKind);
    })
  }, [basemap])

const onBMChange = (bm) => {
    onChange(bm)
  }
const [kind, onChangeKind] = useState('total');

const cangeKind = function () {
  return basemap;
  }

const lCountry = dataJSON.map(( item ) => {

  return (
    <ListCountry
    name={item['country']}
    numeric={item['numeric']}
    longitude={item['longitude']}
    latitude={item['latitude']}
    ill={item['TotalConfirmed']}
    recover={item['TotalDeaths']}
    died={item['NewRecovered']}
    onChange={ cangeKind }
    />
  );
})
    return (
      <MapContainer zoom={2} center={center} maxZoom={18} basemap={ basemap }>
          <TileLayer url={'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png' }/>
          <Basemap  onChange={ onBMChange }/>
          { lCountry }
      </MapContainer>
    );



}

export default MyMap;
