import React, {Component, PropTypes} from "react";
import SelectAddressOption from "./SelectAddressOption";
/* global $ */

class SelectAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saveError: ""
    }
  }

  handleSubmit() {
    let state = {};
    state["saveError"] = "";

    let zipcodeIndex = $("input[name=zipcode]:checked", "#addressForm").val();
    if (typeof zipcodeIndex !== "undefined" && zipcodeIndex != "") {
      zipcodeIndex = zipcodeIndex.trim();
      this.props.save(zipcodeIndex);
    } else {
      state["saveError"] = "Please select the option from the list!";
    }

    this.setState(state);
  }

  onChange(evt) {
    this.setState({
      saveError: ""
    });
  }

  render() {
    return(
      <div>
        <div id="addressForm">
          <legend>List of address from the zipcode.
          Please select and save your choice in the state.</legend>
          {
            this.props.addresses.map(
              $.proxy(function(address, i) {
                return <SelectAddressOption
                  key={i}
                  index={i}
                  address={address}
                  onChange={this.onChange.bind(this)} />;
              }), this)
          }
        </div>
        <div>
        {
          this.state.saveError ?
            <span className="error">{this.state.saveError}</span>
          : null
        }
        </div>
        <div className="row">
          <div className="small-12 columns half-spaced">
            <button type="submit"
              onClick={this.handleSubmit.bind(this)}>Save</button>
          </div>
        </div>
      </div>
    );
  }
};

SelectAddress.propTypes = {
  addresses: PropTypes.arrayOf(PropTypes.object).isRequired,
  save: PropTypes.func.isRequired
};

SelectAddress.defaultProps = {
  addresses: []
};

export default SelectAddress;
