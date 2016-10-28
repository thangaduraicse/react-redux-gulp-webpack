import React, {Component, PropTypes} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import * as ZipCodeActions from "../actions/zipcodeActions";

class SearchZipcode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zipcode: ""
    };
  }

  onChange(evt) {
    this.setState({ zipcode: evt.target.value });
  }

  handleSubmit(evt) {
    let zipcode = evt.target.value;
    if(evt.which === 13 && zipcode != "") {
      zipcode = zipcode.trim();
      this.props.actions.fetchDataFromGoogleAPI(zipcode);
      this.setState({ zipcode: "" });
    }
  }

  render() {
    return (
      <section className="zipCodeContainer">
        <div className="row">
          <div className="small-12 columns spaced">
            <label htmlFor="zipcode">
              <h5>
                Enter the US zipcode:
                <small>(We are using google geocode api only for US)</small>
              </h5>
            </label>
            <input
              id="zipcode"
              name="zipcode"
              type="text"
              autoFocus={true}
              className="form-control"
              placeholder="US zipcode"
              value={this.state.zipcode}
              onChange={this.onChange.bind(this)}
              onKeyDown={this.handleSubmit.bind(this)} />
            {
              this.props.errorMsg.length ?
                <span className="error">{this.props.errorMsg}</span>
              : null
            }
          </div>
        </div>
      </section>
    );
  }
};

SearchZipcode.propTypes = {
  errorMsg: PropTypes.string,
  actions: PropTypes.objectOf(PropTypes.func).isRequired
};

SearchZipcode.defaultProps = {
  errorMsg: ""
};

const mapStateToProps = (state) => {
  return {
    errorMsg: state.zipcodeReducer.fetchZipcodeErrorMessage
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(ZipCodeActions, dispatch)
  };
};

const SearchZipcodeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchZipcode);

export default SearchZipcodeContainer;
