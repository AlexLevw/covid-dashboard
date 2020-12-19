import React, { Component } from 'react';
import './App.scss';
import CountriesList from './components/CountriesList/CountriesList';
import GlobalStatistics from './components/GlobalStatistics/GlobalStatistics';

const indicators = [
  { title: 'Confirmed', api: 'TotalConfirmed' }, 
  { title: 'Deaths', api: 'TotalDeaths' },
  { title: 'Recovered', api: 'TotalRecovered' }
];

let indicatorCounter = 0;

export default class App extends Component {
  state = {
    indicator: indicators[0]
  }

  setIndicator = (num) => {
    if (num === 1) {
      if(indicatorCounter === indicators.length - 1) {
        indicatorCounter = 0;
      } else {
        indicatorCounter += 1;
      } 
    } else {
      if(indicatorCounter === 0) {
        indicatorCounter = indicators.length - 1;
      } else {
        indicatorCounter -= 1;
      }
    }
    this.setState({ indicator: indicators[indicatorCounter] });
  }

  render() {
    return (
      <div className="App">
        <div className="lists">
          <GlobalStatistics />
          <CountriesList indicator={ this.state.indicator } setIndicator={ this.setIndicator } />
        </div>
      </div>
    );
  }
}
