import React, { useState } from "react";
import PropTypes from "prop-types";
import "./_Modal.scss";
import expand from "../../modules/assets/full-screen.svg";
import compress from "../../modules/assets/compress.svg";

export default function Modal({ modalObj, filteringCountries }) {
  const [isOpen, setIsOpen] = useState(false);

  function handleExpandBtnClick() {
    setIsOpen(true);
    if (filteringCountries) filteringCountries("");
  }

  function handleCompressBtnClick() {
    setIsOpen(false);
  }

  return (
    <>
      <button
        className="modal-btn expand"
        onClick={handleExpandBtnClick}
        type="button"
      >
        <img src={expand} alt="expand" />
      </button>

      {isOpen && <div className="modal">{isOpen && modalObj}</div>}
      {isOpen && (
        <button
          className="modal-btn compress"
          onClick={handleCompressBtnClick}
          type="button"
        >
          <img src={compress} alt="compress" />
        </button>
      )}
    </>
  );
}

Modal.propTypes = {
  modalObj: PropTypes.element.isRequired,
  filteringCountries: PropTypes.func,
};

Modal.defaultProps = {
  filteringCountries: null,
};
