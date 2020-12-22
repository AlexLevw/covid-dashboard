import React from 'react';
import './index.scss';

class Basemap extends React.Component {
  onChange = (e) => {
    var bm = e.currentTarget.value;
    if (this.props.onChange) {
      this.props.onChange(bm);
      }
  }

  render() {
    return (
      <div className="basemaps-container">
        <select value={this.props.basemap} onChange={this.onChange}>
          <option value="total">All Population </option>
          <option value="oneDay">Last Day</option>
          <option value="total100">All Cases per 100 000 people</option>
          <option value="oneDay100">Daily Cases per 100 000 people</option>
        </select>
      </div>
    );
  }
};

export default Basemap;
