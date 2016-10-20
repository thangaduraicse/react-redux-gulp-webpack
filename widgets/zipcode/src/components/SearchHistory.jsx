import React, { Component, PropTypes } from "react";
import SearchHistoryItem from "./SearchHistoryItem";
/* global $ */

const SearchHistory = ({searchHistory}) =>
  <div className="row">
    <div className="small-12 columns">
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
  </div>;

SearchHistory.propTypes = {
  searchHistory: PropTypes.arrayOf(PropTypes.object).isRequired
};

SearchHistory.defaultProps = {
  searchHistory: []
};

export default SearchHistory;
