import React from 'react';
import spinner from '../../static/spinner.gif';

// Returnerer en enkel spinner.
const Spinner = () => (
  <div>
    <img
      src={spinner}
      style={{ margin: 'auto', display: 'block' }}
      alt="Laster inn..."
    />
  </div>
);

export default Spinner;
