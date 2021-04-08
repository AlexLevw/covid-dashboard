import React, { useContext } from "react";
import { Tooltip, Marker } from "react-leaflet";
import L from "leaflet";
import dataJSON from "../../modules/data/country";
import { CommonContext } from "../../contexts";
import MarkerStatistic from "./MarkerStatistic/MarkerStatistic";

export default function Markers() {
  const { statisticsData, population, selectedCategory } = useContext(
    CommonContext
  );

  const markers = dataJSON.map((item) => {
    const currentCountry = statisticsData.Countries.find(
      (country) => country.CountryCode === item.alpha2
    );

    const position = [item.latitude, item.longitude];

    let currentPopulation = null;
    let iconSize = 10;

    if (currentCountry) {
      currentPopulation = population.find(
        (i) => i.alpha2Code === currentCountry.CountryCode
      );

      const numberPeople = 100000;

      if (selectedCategory === "total") {
        iconSize = Math.round((currentCountry.TotalConfirmed / 500000) * 4);
      } else if (selectedCategory === "oneDay") {
        iconSize = Math.round((currentCountry.NewConfirmed / 5000) * 4);
      } else if (selectedCategory === "total100") {
        iconSize = Math.round(
          ((currentCountry.TotalConfirmed / currentPopulation.population) *
            numberPeople) /
            100
        );
      } else if (selectedCategory === "oneDay100") {
        iconSize = Math.round(
          (currentCountry.NewConfirmed / currentPopulation.population) *
            numberPeople
        );
      }

      if (iconSize < 8) {
        iconSize = 8;
      }
      if (iconSize > 160) {
        iconSize = 160;
      }
    }

    const iconStiles = `
      width: 100%;
      height: 100%;
      background-color: rgba(255, ${160 - iconSize}, ${160 - iconSize}, .85);
      border-radius: 50%;
    `;

    const myIcon = L.divIcon({
      iconSize: [iconSize < 8 ? 8 : iconSize, iconSize < 8 ? 8 : iconSize],
      popupAnchor: [-10, -10],
      html: `<div style="${iconStiles}"></div>`,
    });

    return (
      <Marker position={position} icon={myIcon} key={item.numeric} kind="total">
        <Tooltip>
          <div className="flag-for-popUp">
            <img
              src={`https://www.countryflags.io/${item.alpha2}/flat/32.png`}
              alt="flag"
            />{" "}
            {item.country}
          </div>
          <br />
          {currentCountry === undefined ? (
            <div>No Data!</div>
          ) : (
            <MarkerStatistic
              currentCountry={currentCountry}
              currentPopulation={currentPopulation}
              selectedCategory={selectedCategory}
            />
          )}
        </Tooltip>
      </Marker>
    );
  });

  return <div>{markers}</div>;
}
