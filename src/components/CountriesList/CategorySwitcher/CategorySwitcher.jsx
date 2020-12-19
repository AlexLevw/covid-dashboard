import React, { Component } from 'react';
import './_CategorySwitcher.scss';
import arrow from '../../../modules/assets/arrow.svg';

export default class CategorySwitcher extends Component {
  render() {
    return (
      <div className="category-switcher">
        <img
          src={ arrow }
          alt="arrow"
          className="switcher-array"
          onClick={ () =>  this.props.setIndicator(1) }
        />
        <div className="switcher-title">{ this.props.indicator.title }</div>
        <img 
          src={ arrow }
          alt="arrow"
          className="switcher-array"
          onClick={ () =>  this.props.setIndicator(-1) }
        />
      </div>
    );
  }
}