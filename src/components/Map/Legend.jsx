import React from 'react';

export default function Legend() {
  return (
    <div className="legend-container">
      <p>Legend</p>
      <div className="legend-information-container" >
        <div className="scale-container"></div>
        <div className="max-min-container">
          <div>min</div>
          <div>max</div>
        </div>
      </div>
    </div>
  );
}
