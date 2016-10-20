import React, {PropTypes} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import * as ZipCodeActions from "../actions/zipcodeActions";
import {SearchHistory, SearchZipcode, SelectAddress} from "../components";

const ZipCodeListApp = ({searchHistory, errorMsg, addresses, actions}) => (
  <div className="wrapper">
    <section className="zipCodeContainer">
      <div className="row">
        <div className="small-12 columns spaced">
          <SearchZipcode name="zipcode"
            getAddressApi={actions.fetchDataFromGoogleAPI}
            errorMsg={errorMsg} />
        </div>
      </div>
    </section>
    {
      addresses.length ?
        <section className="addresses">
          <div className="row">
            <div className="small-12 columns spaced">
              <SelectAddress addresses={addresses}
                save={actions.updateSearchHistory} />
            </div>
          </div>
        </section>
      : null
    }
    {
      searchHistory.length ?
        <section className="zipCodeContainer">
          <div className="row">
            <div className="small-12 columns spaced">
              <SearchHistory searchHistory={searchHistory} />
            </div>
          </div>
        </section>
      : null
    }
  </div>
);

const mapStateToProps = (state) => {
  return {
    addresses: state.zipcodeReducer.addresses,
    searchHistory: state.zipcodeReducer.searchHistory,
    errorMsg: state.zipcodeReducer.fetchZipcodeErrorMessage
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(ZipCodeActions, dispatch)
  };
};

const ZipcodeWidget = connect(
  mapStateToProps,
  mapDispatchToProps
)(ZipCodeListApp);

export default ZipcodeWidget;
