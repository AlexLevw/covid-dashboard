import React from "react";
import { PropTypes } from "prop-types";
import { MapContainer, TileLayer } from "react-leaflet";
import BaseMap from "./BaseMaps";
import Legend from "./Legend/Legend";
import Markers from "./Markers";
import Modal from "../Modal/Modal";
import { MAP_LAYER_URL } from "../../constants";
import "./_Map.scss";

export default function Map({ selectCategory }) {
  const map = (
    <MapContainer zoom={2} center={[39, 22]} maxZoom={10}>
      <TileLayer url={MAP_LAYER_URL} />
      <BaseMap selectCategory={selectCategory} />
      <Legend />
      <Markers />
    </MapContainer>
  );

  return (
    <div className="map-block">
      <Modal modalObj={map} />
      {map}
    </div>
  );
}

Map.propTypes = {
  selectCategory: PropTypes.func.isRequired,
};
