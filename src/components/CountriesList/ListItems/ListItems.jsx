import React, { useContext, useState, useEffect } from "react";
import { PropTypes } from "prop-types";
import { CommonContext } from "../../../contexts";
import "./_ListItems.scss";

export default function ListItems({ countries, setCurrentCountry }) {
  const { currentCountry, indicator } = useContext(CommonContext);
  const [items, setItems] = useState();

  useEffect(() => {
    const sortedCountries = countries.sort(
      (a, b) => b[indicator.api] - a[indicator.api]
    );

    const newItems = sortedCountries.map((item) => {
      const handleOnClick = () =>
        setCurrentCountry({ name: item.Country, code: item.CountryCode });
      const itemIsSelected = currentCountry.code === item.CountryCode;

      return (
        <button
          className={`countries-list__item ${itemIsSelected ? "select" : null}`}
          key={item.CountryCode}
          onClick={handleOnClick}
          type="button"
        >
          <img
            src={`https://www.countryflags.io/${item.CountryCode}/flat/32.png`}
            alt="flag"
          />
          <div className="item-cases">{item[indicator.api]}</div>
          <div className="item-country">{item.Country}</div>
        </button>
      );
    });

    setItems(newItems);
  }, [countries, currentCountry, indicator]);

  return <ul className="countries-list__block">{items}</ul>;
}

ListItems.propTypes = {
  countries: PropTypes.arrayOf(PropTypes.object).isRequired,
  setCurrentCountry: PropTypes.func.isRequired,
};
