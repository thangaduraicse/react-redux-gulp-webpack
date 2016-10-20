import React, { Component, PropTypes } from 'react';

const SearchHistoryItem = ({zipcode}) =>
  <tr>
    <td>
      <div><span>{zipcode.zipcode}</span></div>
    </td>
    <td>
      <div>
        <span>
          {zipcode.locality.length ? zipcode.locality : null}
        </span>
      </div>
    </td>
    <td>
      <div>
        <span>
          {zipcode.neighborhood.length ? zipcode.neighborhood : null}
        </span>
      </div>
    </td>
    <td>
      <div>
        <span>
          {zipcode.county.length ? zipcode.county : null}
        </span>
      </div>
    </td>
    <td>
      <div><span>{zipcode.state}</span></div>
    </td>
  </tr>;

SearchHistoryItem.propTypes = {
  zipcode: PropTypes.object.isRequired
};

SearchHistoryItem.defaultProps = {
  zipcode: {}
};

export default SearchHistoryItem;
