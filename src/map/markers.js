import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import './index.scss'
import { Popup, Marker } from "react-leaflet";
import L  from 'leaflet';

import icon from './circle.png';
import dataJSON from './country.js'

let dataJSONCopy = dataJSON;

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
  for (var i = 0; i < dataJSONCopy.length; i++) {
    let result = countryAll.find((item) => {
      return item['CountryCode'] === dataJSONCopy[i]['alpha2']});
        if(!(typeof result === 'undefined')){
          dataJSONCopy[i]['Slug'] = result["Slug"]
          dataJSONCopy[i]['TotalConfirmed'] = result["TotalConfirmed"]
          dataJSONCopy[i]['TotalDeaths'] = result["TotalDeaths"]
          dataJSONCopy[i]['NewRecovered'] = result["NewRecovered"]
        }
      }
      return dataJSONCopy;
    });


const ListCountry = (props) => {

    const lat = props.latitude;
    const lon = props.longitude;
    let  pos = [];
    !isNaN(lat) ? pos.push(lat) : pos.push(0);
    !isNaN(lon) ? pos.push(lon) : pos.push(0);

    const myIcon = L.icon({
      iconUrl: icon,
      iconSize: [10, 10],
      popupAnchor: [-10, -10],
    })

  let [ill, onChangeIll] = useState(null);
  let [recover, onChangeRecover] = useState(null);
  let [died, onChangeDied] = useState(null);

  useEffect(() => {
   summary.then( ( data ) => {
        let result = data.find((item) => {
          return item['numeric'] === props.numeric;
        });
        onChangeRecover(result.NewRecovered);
        onChangeIll(result.TotalConfirmed);
        onChangeDied(result.TotalDeaths);
      })
  }, [ill, died, recover])

    return (
      <Marker position = { pos }  icon={myIcon} key= { props.numeric } >
        <Popup onChange={ onChangeIll } >
          {props.name} <br />
          Cases: { ill } <br />
          Deaths: { recover } <br />
          Recovered: { died }
        </Popup>
      </Marker>
    )
  }


export default ListCountry;
