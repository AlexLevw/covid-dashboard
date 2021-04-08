import React from "react";
import { PropTypes } from "prop-types";
import "./_StatisticItems.scss";

export default function StatisticItems({ Confirmed, Deaths, Recovered }) {
  return (
    <div className="statistics__items">
      <div className="statistics__item">
        <span className="statistics__title">Cases</span>
        <span className="statistics__number">{Confirmed}</span>
      </div>
      <div className="statistics__item">
        <span className="statistics__title">Deaths</span>
        <span className="statistics__number">{Deaths}</span>
      </div>
      <div className="statistics__item">
        <span className="statistics__title">Recovered</span>
        <span className="statistics__number">{Recovered}</span>
      </div>
    </div>
  );
}

StatisticItems.propTypes = {
  Confirmed: PropTypes.number.isRequired,
  Deaths: PropTypes.number.isRequired,
  Recovered: PropTypes.number.isRequired,
};
