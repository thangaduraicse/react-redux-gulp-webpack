import React, { Component, PropTypes } from 'react';

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
      this.props.getAddressApi(zipcode);
      this.setState({ zipcode: "" });
    }
  }

  render() {
    return (
      <div>
        <label htmlFor="zipcode">
          <h5>
            Enter the US zipcode:
            <small>(We are using google geocode api only for US)</small>
          </h5>
        </label>
        <input
          id={this.props.name}
          name={this.props.name}
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
    );
  }
};

SearchZipcode.propTypes = {
  name: PropTypes.string.isRequired,
  errorMsg: PropTypes.string,
  getAddressApi: PropTypes.func.isRequired
};

SearchZipcode.defaultProps = {
  name: "zipcode",
  errorMsg: ""
};

export default SearchZipcode;
