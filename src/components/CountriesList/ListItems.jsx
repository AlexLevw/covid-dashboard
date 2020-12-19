import React from 'react';
import './_ListItems.scss';

export default function ListItems({ countries, indicator }) {
  const elements = countries.sort((a, b) => {
    return b[indicator.api] - a[indicator.api]
  }).map((item) => {
    return (
      <li className="countries-list__item" key={ item.CountryCode }>
        <img src={`https://www.countryflags.io/${item.CountryCode}/flat/64.png`} alt="flag"></img>
        <span className="item-cases">{ item[indicator.api] }</span>
        <span className="item-country">{ item.Country }</span>
      </li>
    )
  });

  return (
    <ul className="countries-list__block">
      { elements }
    </ul>
  )
}