import React from "react";
import {render} from "react-dom";
import {browserHistory} from "react-router";
import {syncHistoryWithStore} from "react-router-redux";
import {AppContainer} from "react-hot-loader";

import Root from "./Root";
import configureStore from "./store/configureStore";

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);
const rootElement = document.getElementById("root");

render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  rootElement
)

if(module.hot) {
  console.log("module.hot");
  const orgError = console.error;
  console.error = message => {
    if(message &&
        message.indexOf("You cannot change <Router routes>;") === "-1") {
      orgError.apply(console, [message]);
    }
  };
  module.hot.accept("./Root", () => {
    const NextApp = require("./Root").default;
    render(
      <AppContainer>
        <NextApp store={store} history={history} />
      </AppContainer>,
      rootElement
    );
  });
}
