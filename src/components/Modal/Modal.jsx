import React from 'react';
import './_Modal.scss';
import expand from '../../modules/assets/full-screen.svg';
import compress from '../../modules/assets/compress.svg';

export default class Modal extends React.Component {
  state = {
    isOpen: false
  }

  render() {
    return (
      <React.Fragment>
        <button
          className="modal-btn expand"
          onClick={ () => {
            this.setState({ isOpen: true });
            if(this.props.filteringCountries) this.props.filteringCountries('');
          }}
        >
          <img src={ expand } alt="expand"/>
        </button>

        {this.state.isOpen && <div className="modal">
          {this.state.isOpen && this.props.modalObj}  
        </div>}
        {this.state.isOpen && (
          <button
            className="modal-btn compress"
            onClick={ () => this.setState({ isOpen: false }) }
          >
            <img src={ compress } alt="compress"/>
          </button>
        )}

      </React.Fragment>
    );
  }
}