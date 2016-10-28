import React, {Component, PropTypes} from "react";
import _ from "underscore";
import Highcharts from "highcharts";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import * as ZipCodeActions from "../actions/zipcodeActions";

class HighchartSample extends Component {
  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
    this.props.actions.fetchSampleStockDataFromQuantl();
    this.drawGraph();
  }
  
  componentDidUpdate() {
    this.drawGraph();
  }
  
  /** 
   * Generate Random Colors 
  */
  _getRandomColor = () => {
    return '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
  }
  
  /**
   * Setup Highcharts Properties
   */
  drawGraph = () => {
    let _this = this;
    const graphData = _this.props.data;
    const openRate = _.pluck(graphData, "Open");
    const closeRate = _.pluck(graphData, "Close");
    const highRate = _.pluck(graphData, "High");
    const lowRate = _.pluck(graphData, "Low");
    const graphDates = _.pluck(graphData, "Date");
    
    const pointInterval = -86400000;
    const pointStart = Date.parse(graphDates[0]);

    const color1 = _this._getRandomColor();
    const color2 = _this._getRandomColor();
    const color3 = _this._getRandomColor();
    const color4 = _this._getRandomColor();
    
    Highcharts.chart({
      chart: {
        type: "areaspline",
        renderTo: "fbStockReport"
      },
      title: {
        text: "FB Stock Price"
      },
      legend: {
        align: "right",
        verticalAlign: "middle",
        layout: "vertical"
      },
      xAxis: {
        type: "datetime",
        dateTimeLabelFormats: {
          day: "%d %b %Y"
        }
      },
      yAxis: {
        min: 50,
        max: 200,
        tickInterval: 10,
        lineWidth: 1,
        title: {
          text: "Price"
        },
        gridLineColor: "#EBEBEB"
      },
      tooltip: {
        shared: false,
        valueSuffix: "",
        backgroundColor: "#000000",
        borderColor: "#000000",
        style: {
            color: "#FFFFFF"
        },
        formatter: function () {
          return Highcharts.dateFormat("%d %b %Y", this.x)
            + "<br><b>$ " + this.y + " " + this.series.name + "</b>";
        },
        xDateFormat: "%Y-%m-%d"
      },
      credits: {
        enabled: false
      },
      plotOptions: {
        areaspline: {
          fillOpacity: 0.0
        },
        series: {
          pointStart: pointStart,
          pointInterval: pointInterval
        }
      },
      series: [{
        name: "Open",
        data: openRate,
        color: color1,
        lineColor: color1,
        lineWidth: 3,
        marker: {
          symbol: "circle",
          radius: 4,
          fillColor: "#FFFFFF",
          lineWidth: 3,
          lineColor: color1
        }
      }, {
        name: "Low",
        data: lowRate,
        color: color2,
        lineColor: color2,
        lineWidth: 3,
        marker: {
          symbol: "circle",
          radius: 4,
          fillColor: "#FFFFFF",
          lineWidth: 3,
          lineColor: color2
        }
      }, {
        name: "High",
        data: highRate,
        color: color3,
        lineColor: color3,
        lineWidth: 3,
        marker: {
          symbol: "circle",
          radius: 4,
          fillColor: "#FFFFFF",
          lineWidth: 3,
          lineColor: color3
        }
      }, {
        name: "Close",
        data: closeRate,
        color: color4,
        lineColor: color4,
        lineWidth: 3,
        marker: {
          symbol: "circle",
          radius: 4,
          fillColor: "#FFFFFF",
          lineWidth: 3,
          lineColor: color4
        }
      }]
    });
  }
    
  render() {
    let styles = {
      textAlign: "center",
      fontWeight: "bold"
    };
    return (
      <section className="sampleHighChart">
        <div className="row">
          <div className="small-12 columns spaced">
            <h2 style={styles}>FB stock Price Report</h2>
            <div id="fbStockReport" />
          </div>
        </div>
      </section>
    );
  }
};

HighchartSample.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.array).isRequired,
  data: PropTypes.arrayOf(PropTypes.array).isRequired,
  errorMsg: PropTypes.string,
  actions: PropTypes.objectOf(PropTypes.func).isRequired
};

HighchartSample.defaultProps = {
  columns: [],
  data: [],
  errorMsg: ""
};

const mapStateToProps = (state) => {
  return {
    columns: state.zipcodeReducer.graphColumns,
    data: state.zipcodeReducer.graphData,
    errorMsg: state.zipcodeReducer.fetchGraphErrorMessage
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(ZipCodeActions, dispatch)
  };
};

const HighchartContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(HighchartSample);

export default HighchartContainer;
