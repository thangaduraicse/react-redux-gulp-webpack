import constant from "../constants/zipcodeConstants";

const initialState = {
  addresses: [],
  fetchZipcodeErrorMessage: "",
  searchHistory: []
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
    default:
      return state;
  }
};

export default zipcodeReducer;
