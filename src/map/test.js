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

  const listCountry = dataJSON.map(( item ) => {
    const myIcon = L.icon({
      iconUrl: icon,
      iconSize: [10,10],
      popupAnchor: [-10, -10],
    });


 const wait = summary.then( ( summaruData ) => {
    let result = summaruData.find((i) => {
      return i['CountryCode'] == item['alpha2']});
        if(!(typeof result === 'undefined')){
          item['Slug'] = result["Slug"]
          item['TotalConfirmed'] = result["TotalConfirmed"]
          item['TotalDeaths'] = result["TotalDeaths"]
          item['NewRecovered'] = result["NewRecovered"]
        }else{
          item['Slug'] = "no data"
          item['TotalConfirmed'] = "no data"
          item['TotalDeaths'] = "no data"
          item['NewRecovered'] = "no data"
        }
    })
    const ill = "wait ...";
    const recover = "wait ...";
    const died = "wait ...";


    const pos = [item.latitude, item.longitude];

    return (
      <Marker position = { pos }  icon={myIcon} key={ item.numeric }>
        <Popup>
          { item.country } <br />
          Заболевшие: { ill }<br />
          Выздоровевшие: { recover }<br />
          Умершие: { died }
        </Popup>
      </Marker>
    )
  })
