import React, {PropTypes} from 'react';

const App = (props) =>
  <table cellPadding="0" cellSpacing="0" height="100%" width="100%">
    <tbody>
      <tr>
        <td>
          {React.cloneElement({...props}.children, {...props})}
        </td>
      </tr>
    </tbody>
  </table>;

App.propTypes = {
  children: PropTypes.element.isRequired
};

export default App;
