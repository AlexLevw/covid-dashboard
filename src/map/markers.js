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

const stateAPI = "https://jsonware.com/json/f69d50fa8da64e065e84bbcb253f1f11.json";
const populationAPI = "https://restcountries.eu/rest/v2/all?fields=alpha2Code;population";


const summary =  request(`${stateAPI}`).then( ( data ) => {

  const population = request(`${populationAPI}`).then( ( data ) => {
    for (var i = 0; i < dataJSONCopy.length; i++) {
      let result = data.find((item) => {
        return item['alpha2Code'] === dataJSONCopy[i]['alpha2']});
          if(!(typeof result === 'undefined')){
            dataJSONCopy[i]['population'] = result['population']
          }
        }
      })
  const countryAll = data.Countries;
    for (var i = 0; i < dataJSONCopy.length; i++) {
      let result = countryAll.find((item) => {
        return item['CountryCode'] === dataJSONCopy[i]['alpha2']});
          if(!(typeof result === 'undefined')){
            dataJSONCopy[i]['Slug'] = result["Slug"]
            dataJSONCopy[i]['TotalConfirmed'] = result["TotalConfirmed"]
            dataJSONCopy[i]['TotalDeaths'] = result["TotalDeaths"]
            dataJSONCopy[i]['TotalRecovered'] = result["TotalRecovered"]
            dataJSONCopy[i]['NewConfirmed'] = result["NewConfirmed"]
            dataJSONCopy[i]['NewDeaths'] = result["NewDeaths"]
            dataJSONCopy[i]['NewRecovered'] = result["NewRecovered"]
            dataJSONCopy[i]['population'] = result["population"]
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


let kindValue = props.onChange();

useEffect(() => {
 if(kindValue === "total"){
   summary.then( ( data ) => {
     let result = data.find((item) => {
       return item['numeric'] === props.numeric;
     });
     onChangeRecover(result.TotalRecovered);
     onChangeIll(result.TotalConfirmed);
     onChangeDied(result.TotalDeaths);
   })
 }
 if(kindValue === "oneDay"){
   summary.then( ( data ) => {
     let result = data.find((item) => {
       return item['numeric'] === props.numeric;
     });
     onChangeRecover(result.NewRecovered);
     onChangeIll(result.NewConfirmed);
     onChangeDied(result.NewDeaths);
   })
 }
 if(kindValue === "total100"){
   summary.then( ( data ) => {
     let result = data.find((item) => {
       return item['numeric'] === props.numeric;
     });
     const recovered = Math.ceil(result.TotalRecovered * 100000 / result.population);
     const confirmed = Math.ceil(result.TotalConfirmed * 100000 / result.population);
     const deaths = Math.ceil(result.TotalDeaths * 100000 / result.population);
     onChangeRecover(recovered);
     onChangeIll(confirmed);
     onChangeDied(deaths);
   })
 }

 if(kindValue === "oneDay100"){
   summary.then( ( data ) => {
     let result = data.find((item) => {
       return item['numeric'] === props.numeric;
     });
     const recovered = Math.ceil(result.NewRecovered * 100000 / result.population);
     const confirmed = Math.ceil(result.NewConfirmed * 100000 / result.population);
     const deaths = Math.ceil(result.NewDeaths * 100000 / result.population);
     onChangeRecover(recovered);
     onChangeIll(confirmed);
     onChangeDied(deaths);
   })
 }
}, [kindValue])

const  [kind, onChangeKind] = useState('total');
const srcForFlag = `https://www.countryflags.io/${ props.alpha2 }/flat/16.png`;
const onMouseEnter = (e) => {
console.log(e);
}
function handleBoxToggle() {
  console.log("hell");
}
    return (
      <Marker position = { pos }  icon={ myIcon } key= { props.numeric } kind={ kind }  onClick={ handleBoxToggle } >
        <Popup onChange={ onChangeIll } >
          <div className="flag-for-popUp">
            <img src={ srcForFlag } alt="flag"/>  {props.name}
          </div>
         <br />
          Cases: { ill } <br />
          Deaths: { recover } <br />
          Recovered: { died }
        </Popup>
      </Marker>
    )
  }


export default ListCountry;
