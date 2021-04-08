import React, { createContext } from "react";
import { PropTypes } from "prop-types";

const CommonContext = createContext();

function CommonProvider({ value, children }) {
  return (
    <CommonContext.Provider value={value}>{children}</CommonContext.Provider>
  );
}

CommonProvider.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  value: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired,
};

export { CommonContext, CommonProvider };
