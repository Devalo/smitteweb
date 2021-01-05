import React from 'react';
import Navigation from './Navigation';

// Main layout-komponent. Hele applikasjonen legges inn som child
const Layout = ({ children }) => {
  return (
    <div>
      <Navigation />
      <div className="container main-container">
        {children}
      </div>
    </div>
  );
};

export default Layout;
