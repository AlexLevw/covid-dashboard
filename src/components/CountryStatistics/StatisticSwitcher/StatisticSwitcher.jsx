import React  from 'react';
import './_StatisticSwitcher.scss';
import arrow from '../../../modules/assets/arrow.svg'

const categoriesTitle = {
  'day': {
    'total': 'All Time',
    'oneDay': 'Last Day',
    'total100': 'All Time',
    'oneDay100': 'Last Day'
  },
  'num': {
    'total': 'All people',
    'oneDay': 'All people',
    'total100': 'per 100,000 people',
    'oneDay100': 'per 100,000 people'
  }
}

export default function StatisticSwitcher({ selectedCategory, selectCategory, type}) {

  function checkCategories() {
    if(type === 'day') {
      if(selectedCategory === 'total'){
        return 'oneDay';
      } else if(selectedCategory === 'oneDay') {
        return 'total';
      } else if(selectedCategory === 'total100') {
        return 'oneDay100';
      } else if(selectedCategory === 'oneDay100') {
        return 'total100';
      }
    } else if(type === 'num'){
      if(selectedCategory === 'total'){
        return 'total100';
      } else if(selectedCategory === 'oneDay') {
        return 'oneDay100';
      } else if(selectedCategory === 'total100') {
        return 'total';
      } else if(selectedCategory === 'oneDay100') {
        return 'oneDay';
      }
    }
  }
  
  return (
    <div className="statistic-switcher">
      <img
        className="switcher-array"
        src={ arrow }
        alt="arrow"
        onClick={ () => {
          selectCategory(checkCategories())
        } }
      />

      <div className="switcher-title">
        { categoriesTitle[type][selectedCategory] }
      </div>

      <img className="switcher-array"
        src={ arrow }
        alt="arrow"
        onClick={ () => {
          selectCategory(checkCategories())
        } }
        />
    </div>
  )
}