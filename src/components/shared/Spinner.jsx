import React from 'react';
import spinner from '../../static/spinner.gif';

const Spinner = () => (
  <div>
    <img
      src={spinner}
      style={{ margin: 'auto', display: 'block' }}
      alt="Loading..."
    />
  </div>
);

export default Spinner;
