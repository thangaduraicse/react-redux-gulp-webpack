import constant from "../constants/zipcodeConstants";

const initialState = {
  addresses: [],
  fetchZipcodeErrorMessage: "",
  searchHistory: [],
  graphColumns: [],
  graphData: [],
  fetchGraphErrorMessage: ""
};

const zipcodeReducer = (state = initialState, action) => {
  switch(action.type) {
    case constant.FETCH_ZIPCODE_SUCCESS:
      return {
        ...state,
        addresses: action.addresses,
        fetchZipcodeErrorMessage: ""
      };
    case constant.FETCH_ZIPCODE_FAILURE:
      return {
        ...state,
        fetchZipcodeErrorMessage: action.message
      };
    case constant.UPDATE_SEARCH_HISTORY:
      return {
        ...state,
        searchHistory: [
          ...state.searchHistory,
          state.addresses[action.index]
        ],
        addresses: []
      };
    case constant.FETCH_STOCK_DATA_FROM_QUANTL_SUCCESS:
      return {
        ...state,
        graphColumns: action.columns,
        graphData: action.data,
        fetchGraphErrorMessage: ""
      };
    case constant.FETCH_STOCK_DATA_FROM_QUANTL_FAILURE:
      return {
        ...state,
        fetchGraphErrorMessage: action.message
      };
    default:
      return state;
  }
};

export default zipcodeReducer;
