import React from 'react';

export default function BaseMap({ selectedCategory, selectCategory }) {

  return (
    <div className="base-maps-container">
      <select onChange={ (e) => {selectCategory(e.currentTarget.value)} } value={ selectedCategory }>
        <option value="total">All Population </option>
        <option value="oneDay">Last Day</option>
        <option value="total100">All Cases per 100 000 people</option>
        <option value="oneDay100">Daily Cases per 100 000 people</option>
      </select>
    </div>
  );
};
