import React, { Component } from 'react';
import arrow from '../../../modules/assets/arrow.svg';
import './_CategorySwitcher.scss';

export default class CategorySwitcher extends Component {
  render() {
    return (
      <div className="category-switcher">
        <img
          src={ arrow }
          alt="arrow"
          className="switcher-array"
          onClick={ () =>  this.props.changeIndicator(1) }
        />
        <div className="switcher-title">{ this.props.indicator.title }</div>
        <img 
          src={ arrow }
          alt="arrow"
          className="switcher-array"
          onClick={ () =>  this.props.changeIndicator(-1) }
        />
      </div>
    );
  }
}