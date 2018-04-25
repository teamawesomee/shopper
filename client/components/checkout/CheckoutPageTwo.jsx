import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import STRIPE_PUBLISHABLE from './constants/stripe';
import { onToken } from '../../store/checkout.js';
import { connect } from 'react-redux';

const CURRENCY = 'USD';

const successPayment = data => {
  alert('Payment Successful');
}

const errorPayment = data => {
  alert('Payment Error');
}



class CheckoutPageTwo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name,
      description,
      source: token.id,
      currency: CURRENCY,
      amount,
      stripeKey
    }
  }

  render() {
    return (
      <div className="pageForm">
    <StripeCheckout
      name={name}
      description={description}
      amount={fromEuroToCent(amount)}
      token={onToken(amount, description)}
      currency={CURRENCY}
      stripeKey={STRIPE_PUBLISHABLE}
    />


      </div>
    );
  }
}


const mapState = (state) => {
    return {
      name:  state.myCheckoutInfo.name,
      description:  state.myCheckoutInfo.description,
      source:  state.myCheckoutInfo.source,
      currency:  state.myCheckoutInfo.currency,
      amount: state.myCheckoutInfo.amount,
      stripeKey: state.myCheckoutInfo.stripeKey}

}

const mapDispatch = dispatch => {
  return {
    onToken(amount, description) {
      dispatch(onToken(amount, description))
    }
  }
}

export default connect(mapState, mapDispatch)(CheckoutPageTwo);
