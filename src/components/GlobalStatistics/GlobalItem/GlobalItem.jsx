import React from "react";
import { PropTypes } from "prop-types";
import "./_GlobalItem.scss";

export default function GlobalItem({ label, numbers }) {
  return (
    <div className="global-statistics__item">
      <span className="global-statistics__label">{label}</span>
      <span className="global-statistics__number">{numbers}</span>
    </div>
  );
}

GlobalItem.propTypes = {
  label: PropTypes.string.isRequired,
  numbers: PropTypes.number.isRequired,
};
