import React, { Component } from 'react';
import { StripeProvider, Stripe, Elements } from 'react-stripe-elements';
import CheckoutPageOne from './CheckoutPageOne.jsx';
// import CheckoutPageTwo from './CheckoutPageTwo.jsx';
import { checkout } from '../../store/checkout';
import { connect } from 'react-redux';
import ErrorBoundary from '../ErrorBoundary';

function CheckoutPage(props) {

    return (

      <div className ="checkoutPage">
        <div className="titleHolder">
          <h1>Checkout</h1>
        </div>
        <div className="checkoutForm">
          {props.cart.length ?
          <ErrorBoundary>
            <CheckoutPageOne />
          </ErrorBoundary> : <div className="alertHolder">
          <div className="alert"><p>You can't check out without any items in your cart!</p></div>
          </div>

        }
        </div>
      </div>

    );
  }

const mapState = state => {
    return {
      user: state.user,
      checkoutInfo: state.checkoutInfo,
      cart: state.cart
    }

  }
const mapDispatch = dispatch => {
  return {
    submitOrder(){
      dispatch(checkout());
    }
  }
}

export default connect(mapState, mapDispatch)(CheckoutPage)

