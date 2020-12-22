import React, { useEffect, useState } from 'react';
import './index.scss'

import { Tooltip, Marker } from "react-leaflet";
import L  from 'leaflet';

import icon from './circle.svg';

import dataJSON from '../../modules/data/country.js'

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

const population = request(`${populationAPI}`).then( ( data ) => {

  // for (var i = 0; i < dataJSONCopy.length; i++) {
  //
  //   const result = data.find((item) => {
  //     return item['alpha2Code'] === dataJSONCopy[i]['alpha2']});
  //
  //     if(!(typeof result === 'undefined')){
  //       dataJSONCopy[i]['population'] = result['population'];
  //     }
  //   }
    console.log(data);
    return data;
  });

const summary =  request(`${stateAPI}`).then( ( data ) => {

  const countryAll = data.Countries;

  for (var i = 0; i < dataJSONCopy.length; i++) {

    const result = countryAll.find((item) => {
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
    };
    return dataJSONCopy;
});

const allData = summary.then(( data ) => {

  function getMaxOfArray(numArray) {
    return Math.max.apply(null, numArray);
  }
  const maxTotal = dataJSONCopy.map((data)=>{
    return (!(typeof data['TotalConfirmed'] === 'undefined')) ? data['TotalConfirmed'] : 0;
  })
  const maxNew = dataJSONCopy.map((data)=>{
    return (!(typeof data['NewConfirmed'] === 'undefined')) ? data['NewConfirmed'] : 0;
  })

  const maxTotalresult = getMaxOfArray(maxTotal);
  const maxNewresult = getMaxOfArray(maxNew);

  for (var i = 0; i < data.length; i++) {
    let iconChangeTotal = Math.ceil(data[i]['TotalRecovered'] * 50 / maxTotalresult)
    let iconChangeNew = Math.ceil(data[i]['NewRecovered'] * 50 / maxNewresult)
    data[i]['iconChangeTotal'] = iconChangeTotal
    data[i]['iconChangeNew'] = iconChangeNew
  }
  return data;
})

//  Создание компонента

const ListCountry = (props) => {

  const lat = props.latitude;
  const lon = props.longitude;
  let  pos = [];
  !isNaN(lat) ? pos.push(lat) : pos.push(0);
  !isNaN(lon) ? pos.push(lon) : pos.push(0);

  const srcForFlag = `https://www.countryflags.io/${ props.alpha2 }/flat/16.png`;

  let myIconStart = L.divIcon({
    shadowUrl: icon,
    shadowSize: [12, 12],
    iconSize: [10, 10],
    popupAnchor: [-10, -10],
  })

  let [ill, onChangeIll] = useState(null);
  let [recover, onChangeRecover] = useState(null);
  let [died, onChangeDied] = useState(null);
  let [myIcon, onChangeIcon] = useState(myIconStart);

function changeIcon(size) {

let newSize  = isNaN(size) ? 0 : size + 10

return myIcon = L.divIcon({
        shadowUrl: icon,
        shadowSize: [12, 12],
        iconSize: [newSize, newSize],
        popupAnchor: [-10, -10],
      })

}

let kindValue = props.onChange();

useEffect(() => {

   allData.then( ( data ) => {

     let result = data.find((item) => {
       return item['numeric'] === props.numeric;
     });
    const newIconForMarkerTotal = changeIcon(result.iconChangeTotal)
    const newIconForMarkerNew = changeIcon(result.iconChangeNew)

     if(kindValue === "total"){
       onChangeIcon(newIconForMarkerTotal)
       onChangeRecover(result.TotalRecovered);
       onChangeIll(result.TotalConfirmed);
       onChangeDied(result.TotalDeaths);
      }
    if(kindValue === "oneDay"){
        onChangeIcon(newIconForMarkerNew)
        onChangeRecover(result.NewRecovered);
        onChangeIll(result.NewConfirmed);
        onChangeDied(result.NewDeaths);
      }


       if(kindValue === "total100"){
         population.then(( population ) => {
          const pop = population.find((item) => {
              return item['alpha2Code'] === result.alpha2
              });
          let countyPopulation = (!(typeof pop === 'undefined')) ? pop['population'] : 0;
          // Выздоровевшие на 100 тыс.
          const recoveredTotal100 = (!(typeof result.TotalRecovered === 'undefined'))
          && (!(typeof countyPopulation === 0 ))
          ? Math.round(result.TotalRecovered / 100000 * countyPopulation) : 0;
             onChangeRecover(recoveredTotal100);

          // Подтвержденные случаи на 100 тыс.
         const confirmedTotal100 = (!(typeof result.TotalConfirmed === 'undefined'))
         && (!(typeof countyPopulation === 0 ))
         ? Math.round(result.TotalConfirmed / 100000 * countyPopulation) : 0;
         onChangeIll(confirmedTotal100);

         // Умершие на 100 тыс.
         const deathsTotal100 = (!(typeof result.TotalDeaths === 'undefined'))
         && (!(typeof countyPopulation === 0 ))
         ? Math.round(result.TotalDeaths / 100000 * countyPopulation) : 0;
         onChangeDied(deathsTotal100);
         // Увеличение точки
         const confirmedTotal100Icon = !isNaN(result.iconChangeTotal) ? ( result.TotalConfirmed * 50 / confirmedTotal100 * result.iconChangeTotal /  result.TotalConfirmed )  : 0;
         const newIconTotal = changeIcon(confirmedTotal100Icon);
         onChangeIcon(newIconTotal);
          })
         }
       if(kindValue === "oneDay100"){
         population.then(( population ) => {
          const pop = population.find((item) => {
              return item['alpha2Code'] === result.alpha2
              });
          let countyPopulation = (!(typeof pop === 'undefined')) ? pop['population'] : 0;
         // За один день
         //Востановились
         const recovered = (!(typeof result.NewRecovered === 'undefined'))
         && (!(typeof countyPopulation === 0 ))
         ? Math.round(result.NewRecovered / 100000 * countyPopulation) : 0;
         onChangeRecover(recovered);

         // Новые случаи
         const confirmed = (!(typeof result.NewConfirmed === 'undefined'))
         && (!(typeof countyPopulation === 0 ))
         ? Math.round(result.NewConfirmed / 100000 * countyPopulation) : 0;
         onChangeIll(confirmed);

         //Смерти
         const deaths = (!(typeof result.NewDeaths === 'undefined'))
         && (!(typeof countyPopulation === 0 ))
         ? Math.round(result.NewDeaths / 100000 * countyPopulation): 0;
         onChangeDied(deaths);

         const confirmedNew100Icon = !isNaN(result.iconChangeNew) ?
         ( result.NewConfirmed * 50 / confirmed * result.iconChangeNew /  result.NewConfirmed ) : 0;

         const newIconNew = changeIcon(confirmedNew100Icon);
         onChangeIcon(newIconNew);
        })
     }
    })


}, [kindValue])

const  [kind, onChangeKind] = useState('total');


    return (
      <Marker position = { pos }  icon={ myIcon } key= { props.numeric } kind={ kind } >
        <Tooltip onChange={ onChangeIll } >
          <div className="flag-for-popUp">
            <img src={ srcForFlag } alt="flag"/>  { props.name }
          </div>
         <br />
          Cases: { ill } <br />
          Recovered: { recover } <br />
          Deaths: { died }
        </Tooltip>
      </Marker>
    )
  }


export default ListCountry;
