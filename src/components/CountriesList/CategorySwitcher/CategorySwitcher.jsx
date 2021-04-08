import React, { useContext, memo } from "react";
import { PropTypes } from "prop-types";
import arrow from "../../../modules/assets/arrow.svg";
import { CommonContext } from "../../../contexts";
import "./_CategorySwitcher.scss";

function CategorySwitcher({ changeIndicator }) {
  const { indicator } = useContext(CommonContext);
  console.log("opp");
  const handleLeftArrClick = () => changeIndicator(1);
  const handleRightArrClick = () => changeIndicator(-1);

  return (
    <div className="category-switcher">
      <button
        className="switcher-arrow"
        onClick={handleLeftArrClick}
        type="button"
      >
        <img src={arrow} alt="arrow" />
      </button>
      <div className="switcher-title">{indicator.title}</div>
      <button
        className="switcher-arrow"
        onClick={handleRightArrClick}
        type="button"
      >
        <img src={arrow} alt="arrow" />
      </button>
    </div>
  );
}

CategorySwitcher.propTypes = {
  changeIndicator: PropTypes.func.isRequired,
};

export default memo(CategorySwitcher);
