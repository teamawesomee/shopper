import React, { Component } from 'react';
import { StripeProvider, Stripe, Elements } from 'react-stripe-elements';
import CheckoutPageOne from './CheckoutPageOne.jsx';
// import CheckoutPageTwo from './CheckoutPageTwo.jsx';

function CheckoutPage() {

    return (
      <div className ="checkoutPage">
        <div className="titleHolder">
          <h1>Checkout</h1>
        </div>
        <div className="pageHolder">
          <div className="progressSidebar">
            <div className="trackerHolder">
              <h5>Check your order</h5>
              <div className="progressBar achieved" />
              <img className="checkmark" />
            </div>
            <div className="trackerHolder">
              <div className="progressBar" />
              <img className="checkmark" />
            </div>
            <div className="trackerHolder">
              <div className="progressBar" />
              <img className="checkmark" />
            </div>
            <div className="trackerHolder">
              <div className="progressBar" />
              <img className="checkmark" />
            </div>
          </div>
          <div className="checkoutForm">

            {/* <Elements> */}
              <CheckoutPageOne />
              {/* <CheckoutPageTwo /> */}
            {/* </Elements> */}
          </div>
        </div>
      </div>
    );
  }



export default CheckoutPage;
