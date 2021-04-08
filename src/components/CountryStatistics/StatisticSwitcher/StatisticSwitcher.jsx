import React, { useContext } from "react";
import { PropTypes } from "prop-types";
import { CommonContext } from "../../../contexts";
import "./_StatisticSwitcher.scss";
import swapIcon from "../../../modules/assets/swap.svg";

const categoriesTitle = {
  day: {
    total: "All Time",
    oneDay: "Last Day",
    total100: "All Time",
    oneDay100: "Last Day",
  },
  num: {
    total: "All people",
    oneDay: "All people",
    total100: "per 100,000",
    oneDay100: "per 100,000",
  },
};

export default function StatisticSwitcher({ selectCategory, type }) {
  const { selectedCategory } = useContext(CommonContext);

  function handelOnClick() {
    if (type === "day") {
      switch (selectedCategory) {
        case "total":
          selectCategory("oneDay");
          break;
        case "oneDay":
          selectCategory("total");
          break;
        case "total100":
          selectCategory("oneDay100");
          break;
        case "oneDay100":
          selectCategory("total100");
          break;
        default:
          selectCategory("total100");
      }
      return;
    }
    switch (selectedCategory) {
      case "total":
        selectCategory("total100");
        break;
      case "oneDay":
        selectCategory("oneDay100");
        break;
      case "total100":
        selectCategory("total");
        break;
      case "oneDay100":
        selectCategory("oneDay");
        break;
      default:
        selectCategory("oneDay");
    }
  }

  const swap = (
    <button className="switcher-swap" type="button" onClick={handelOnClick}>
      <img src={swapIcon} alt="swap" />
    </button>
  );

  return (
    <div className="statistic-switcher">
      {type === "day" && swap}
      <div className="switcher-title">
        {categoriesTitle[type][selectedCategory]}
      </div>
      {type === "num" && swap}
    </div>
  );
}

StatisticSwitcher.propTypes = {
  selectCategory: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};
