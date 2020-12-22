import React from 'react';
import './_StatisticSwitcher.scss';
import arrow from '../../../modules/assets/arrow.svg'

export default function StatisticSwitcher({ setParam, isParam, titles }) {
  return (
    <div className="statistic-switcher">
      <img className="switcher-array" src={ arrow } alt="arrow" onClick={ () => setParam(!isParam) } />
      <div className="switcher-title">{ isParam ? titles[0] : titles[1] }</div>
      <img className="switcher-array" src={ arrow } alt="arrow" onClick={ () => setParam(!isParam) } />
    </div>
  )
}