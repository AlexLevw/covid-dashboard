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
          <option value="total">Общее колличество</option>
          <option value="oneDay">За последний день</option>
          <option value="total100">На 100 000 в целом</option>
          <option value="oneDay100">На 100 000 за день</option>
        </select>
      </div>
    );
  }
};

export default Basemap;
