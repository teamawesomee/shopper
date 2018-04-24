import React from 'react';
import { Navbar } from './components';
import Routes from './routes';
import ErrorBoundary from './components/ErrorBoundary';

function StripeElement() {

    return (
      <div>
        {/* <ErrorBoundary> */}
          <Navbar />
          <Routes />
        {/* </ErrorBoundary> */}
      </div>
    );

}

export default StripeElement;
