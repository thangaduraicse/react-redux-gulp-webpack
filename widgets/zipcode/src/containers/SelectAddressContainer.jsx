/* global $ */
import React, {Component, PropTypes} from "react";
import SelectAddressOption from "../components/SelectAddressOption";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import * as ZipCodeActions from "../actions/zipcodeActions";

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
      this.props.actions.updateSearchHistory(zipcodeIndex);
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
    if (!this.props.addresses.length) {
      return null;
    }
    
    return(
      <section className="addresses">
        <div className="row">
          <div className="small-12 columns spaced">
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
        </div>
      </section>
    );
  }
};

SelectAddress.propTypes = {
  addresses: PropTypes.arrayOf(PropTypes.object).isRequired,
  actions: PropTypes.objectOf(PropTypes.func).isRequired
};

SelectAddress.defaultProps = {
  addresses: []
};

const mapStateToProps = (state) => {
  return {
    addresses: state.zipcodeReducer.addresses
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(ZipCodeActions, dispatch)
  };
};

const SelectAddressContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectAddress);

export default SelectAddressContainer;
