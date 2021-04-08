const INDICATORS = [
  { title: "Cases", api: "TotalConfirmed" },
  { title: "Deaths", api: "TotalDeaths" },
  { title: "Recovered", api: "TotalRecovered" },
];

const MAP_LAYER_URL =
  "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png?api_key=1b64bd1b-ddd1-4e14-a9b7-2459c896c20a";

export { INDICATORS, MAP_LAYER_URL };
