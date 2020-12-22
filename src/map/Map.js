import React, { useEffect, useState} from 'react';
import './index.scss'

import { MapContainer, TileLayer } from "react-leaflet";

import Basemap from './Basemaps';
import Legend from './Legend.js';
import ListCountry from './Markers';

import dataJSON from '../modules/data/country.js'

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
    alpha2={item['alpha2']}
    />
  );
})
    return (
      <MapContainer zoom={2} center={center} maxZoom={10} basemap={ basemap }>
          <TileLayer url={'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png' }/>
          <Basemap  onChange={ onBMChange }/>
          <Legend />
          { lCountry }
      </MapContainer>
    );



}

export default MyMap;
