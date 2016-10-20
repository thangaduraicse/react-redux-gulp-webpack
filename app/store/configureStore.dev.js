import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import createLogger from "redux-logger";

import rootReducer from "../reducers/rootReducer";

const logger = createLogger();
const middlewares = [
  thunk,
  logger,
  require("redux-immutable-state-invariant")()
];

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer, 
    initialState, 
    applyMiddleware(...middlewares));

  if (module.hot) {
    module.hot.accept("../reducers/rootReducer", () => {
      const nextReducer = require("../reducers/rootReducer").default;
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
