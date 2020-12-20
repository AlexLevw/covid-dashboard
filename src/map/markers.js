import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import './index.scss'
import { Popup, Marker} from "react-leaflet";
import L  from 'leaflet';

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
      return item['CountryCode'] === dataJSON[i]['alpha2']});
        if(!(typeof result === 'undefined')){
          dataJSON[i]['Slug'] = result["Slug"]
          dataJSON[i]['TotalConfirmed'] = result["TotalConfirmed"]
          dataJSON[i]['TotalDeaths'] = result["TotalDeaths"]
          dataJSON[i]['NewRecovered'] = result["NewRecovered"]
        }
      }
      return dataJSON;
    });


const ListCountry = (props) => {

    const lat = props.latitude;
    const lon = props.longitude;
    let  pos = [];
    !isNaN(lat) ? pos.push(lat) : pos.push(0);
    !isNaN(lon) ? pos.push(lon) : pos.push(0);

    const myIcon = L.icon({
      iconUrl: icon,
      iconSize: [10,10],
      popupAnchor: [-10, -10],
    })

  let [ill, onChangeIll] = useState(props.ill);
  let [recover, onChangeRecover] = useState(props.recover);
  let [died, onChangeDied] = useState(props.died);


  useEffect(() => {

    summary.then( ( data ) => {

      let result = data.find((item) => {
        return item['numeric'] === props.numeric});
        onChangeIll = (ill) => {
          ill = (result['TotalConfirmed']);
          return  ill;
        }
        if(!(typeof result === 'undefined')){
          onChangeIll(result['TotalConfirmed'])
        }

      })

    }, [ill, recover, died])



    return (
      <Marker position = { pos }  icon={myIcon} key={ props.numeric } >
        <Popup onChange={ onChangeIll } >
          {props.name} <br />
          Заболевшие: { ill }<br />
          Выздоровевшие: { recover }<br />
          Умершие: { died }
        </Popup>
      </Marker>
    )
  }


export default ListCountry;
