/* global $ */
import React, { Component, PropTypes } from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import * as ZipCodeActions from "../actions/zipcodeActions";
import SearchHistoryItem from "../components/SearchHistoryItem";

const SearchHistory = ({searchHistory}) => {
  if(!searchHistory.length) {
    return null;
  }
  
  return(
    <section className="zipCodeContainer">
      <div className="row">
        <div className="small-12 columns spaced">
          <table>
            <caption><h5>Zip Code History</h5></caption>
            <thead>
              <tr>
                <th>ZipCode</th>
                <th>Locality</th>
                <th>Neighborhood</th>
                <th>County</th>
                <th>State</th>
              </tr>
            </thead>
            <tbody>
              {
                searchHistory.map(
                  $.proxy(function(zipcode, key) {
                    return <SearchHistoryItem
                      key={key}
                      zipcode={zipcode} />;
                  }), this)
              }
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

SearchHistory.propTypes = {
  searchHistory: PropTypes.arrayOf(PropTypes.object).isRequired
};

SearchHistory.defaultProps = {
  searchHistory: []
};

const mapStateToProps = (state) => {
  return {
    searchHistory: state.zipcodeReducer.searchHistory
  };
};

const SearchHistoryContainer = connect(mapStateToProps)(SearchHistory);

export default SearchHistoryContainer;
