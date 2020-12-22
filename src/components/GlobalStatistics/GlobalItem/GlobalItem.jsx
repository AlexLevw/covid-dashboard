import React from 'react';
import './_GlobalItem.scss';

export default function GlobalItem( props ) {  
  return (
    <div className="global-statistics__item">
      <span className="global-statistics__label">{ props.label }</span>
      <span className="global-statistics__number">{ props.numbers }</span>
    </div>
  );
}