import React from 'react';
import { Navbar } from './components';
import Routes from './routes';
import ErrorBoundary from './components/ErrorBoundary';

function StripeElement() {

    return (
      <div>
          <Navbar />
          <Routes />
      </div>
    );

}

export default StripeElement;
