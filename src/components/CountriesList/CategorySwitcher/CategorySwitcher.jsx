import React, { Component } from 'react';
import './_CategorySwitcher.scss';

export default class CategorySwitcher extends Component {
  render() {
    return (
      <div className="category-switcher">
        <div className="switcher-array" onClick={ () =>  this.props.setIndicator(1) }></div>
        <div className="switcher-title">{ this.props.indicator.title }</div>
        <div className="switcher-array" onClick={ () =>  this.props.setIndicator(-1) }></div>
      </div>
    );
  }
}