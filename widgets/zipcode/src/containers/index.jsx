import React, {Component, PropTypes} from "react";

import HighChartContainer from "./HighChartContainer";
import SearchZipcodeContainer from "./SearchZipcodeContainer";
import SelectAddressContainer from "./SelectAddressContainer";
import SearchHistoryContainer from "./SearchHistoryContainer";

const ZipcodeWidget = () => 
  <div className="wrapper">
    <HighChartContainer />
    <SearchZipcodeContainer />
    <SelectAddressContainer />
    <SearchHistoryContainer />
  </div>;

export default ZipcodeWidget;
