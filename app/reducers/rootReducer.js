import {combineReducers} from "redux";
import {routerReducer as routing} from "react-router-redux";

import zipcodeReducer from "../../widgets/zipcode/src/reducers/zipcodeReducer";

export default combineReducers({
  routing,
  zipcodeReducer
});
