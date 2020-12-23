import React from 'react';
import { MapContainer, TileLayer } from "react-leaflet";
import BaseMap from './BaseMaps';
import Legend from './Legend';
import Markers from './Markers';
import Modal from '../Modal/Modal';
import './_Map.scss'

export default function Map({ statisticsData, population,
  selectedCategory, selectCategory})
{

  const center = [39, 22];

  const map = 
  <MapContainer zoom={2} center={center} maxZoom={10}>
    <TileLayer
      url={`https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png?api_key=1b64bd1b-ddd1-4e14-a9b7-2459c896c20a`}
    />
    <BaseMap selectedCategory={ selectedCategory }  selectCategory={ selectCategory }/>
    <Legend />
    <Markers
    statisticsData={ statisticsData }
    population={ population }
    selectedCategory={ selectedCategory }
    />
  </MapContainer>

  return (
    <div className="map-block">
      <Modal modalObj={ map }/>
      { map }
    </div>
  );
}
