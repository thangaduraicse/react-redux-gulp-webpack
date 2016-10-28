import _ from "underscore";
require("es6-promise").polyfill();
import fetch from "isomorphic-fetch";

import constant from "../constants/zipcodeConstants";

export function fetchZipcodeRequest() {
  return {
    type: constant.FETCH_ZIPCODE_REQUEST
  };
}

export function fetchZipcodeSuccess(addresses) {
  return {
    type: constant.FETCH_ZIPCODE_SUCCESS,
    addresses
  };
}

export function fetchZipcodeFailure(message) {
  return {
    type: constant.FETCH_ZIPCODE_FAILURE,
    message
  };
}

export function fetchDataFromGoogleAPI(zipcode) {
  return dispatch => {
    dispatch(fetchZipcodeRequest);
    return fetch("http://maps.googleapis.com/maps/api/geocode/" +
      "json?sensor=true&components=country:US|postal_code:"+zipcode)
      .then(res => res.json())
      .then(json => {
        let chkResultLengthEqZero = 0;
        if(json.status === "ZERO_RESULTS" ||
          json.results.length === chkResultLengthEqZero) {
          dispatch(fetchZipcodeFailure("Please enter the valid" +
          "US zipcode!"));
        } else {
          let addrJson, addressDetails = [];
          const addressComponents = _.pluck(json.results, "address_components");
          _.each(addressComponents, function(address) {
            addrJson = {
              zipcode: zipcode,
              neighborhood: "",
              locality: "",
              county: "",
              state: "",
              country: ""
            };
            if(address[0].short_name === zipcode) {
              _.each(address, function(addr) {
                if(_.contains(addr.types, "neighborhood"))
                  addrJson.neighborhood = addr.short_name;
                if(_.contains(addr.types, "locality"))
                  addrJson.locality = addr.short_name;
                if(_.contains(addr.types, "administrative_area_level_2"))
                  addrJson.county = addr.short_name;
                if(_.contains(addr.types, "administrative_area_level_1"))
                  addrJson.state = addr.short_name;
                if(_.contains(addr.types, "country"))
                  addrJson.country = addr.short_name;
              });
              addressDetails = [...addressDetails, addrJson];
            }
          });
          dispatch(fetchZipcodeSuccess(addressDetails));
        }
      })
      .catch(ex => {
        dispatch(fetchZipcodeFailure("Error in getting data from" +
          "google geocode api!"));
      });
  };
}

export function updateSearchHistory(addressedIndex) {
  return {
    type: constant.UPDATE_SEARCH_HISTORY,
    index: addressedIndex
  };
}

export function fetchStockDataFromQuantlRequest() {
  return {
    type: constant.FETCH_STOCK_DATA_FROM_QUANTL_REQUEST
  };
}

export function fetchStockDataFromQuantlSuccess(columns, data) {
  return {
    type: constant.FETCH_STOCK_DATA_FROM_QUANTL_SUCCESS,
    columns,
    data
  };
}

export function fetchStockDataFromQuantlFailure(message) {
  return {
    type: constant.FETCH_STOCK_DATA_FROM_QUANTL_FAILURE,
    message
  };
}

export function fetchSampleStockDataFromQuantl() {
  return dispatch => {
    dispatch(fetchStockDataFromQuantlRequest);
    return fetch("https://www.quandl.com/api/v3/datasets/WIKI/" + 
      "FB.json?api_key=AvLgG8CjuBrtx3C3kDwL")
      .then(res => res.json())
      .then(json => {
        let dataset = json.dataset;
        let startIndex = 0;
        let endIndex = 5;
        let maxData = 25;
        let columnNames = dataset.column_names.slice(startIndex, endIndex);
        let gData = dataset.data.slice(startIndex, maxData)
                      .map(data => data.slice(startIndex, endIndex));
        // Combine Two Array to Form Objects
        gData = _.map(gData, d => _.object(columnNames, d));
        dispatch(fetchStockDataFromQuantlSuccess(columnNames, gData));
      })
      .catch(ex => {
        dispatch(fetchStockDataFromQuantlFailure("Error in getting data from" +
          "Quantl api!"));
      });
  };
}
