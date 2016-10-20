import React, { Component, PropTypes } from 'react';

class SelectAddressOption extends Component {
  constructor(props) {
    super(props);
  }

  onChange(evt) {
    this.props.onChange(evt)
  }

  render() {
    let address = this.props.address;
    return(
      <div className="row">
        <div className="small-12 columns half-spaced">
          <input
            type="radio"
            name="zipcode"
            id={address.zipcode}
            onChange={this.onChange.bind(this)}
            value={this.props.index} />
          <label htmlFor={address.zipcode}>
            {
              address.locality.length ? `${address.locality}, ` : null
            }
            {
              address.county.length ? `${address.county}, ` : null
            }
            {
              `${address.state} ${address.zipcode}, ${address.country}`
            }
          </label>
        </div>
      </div>
    );
  }
};

SelectAddressOption.propTypes = {
  address: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
};

SelectAddressOption.defaultProps = {
  address: {}
};

export default SelectAddressOption;
