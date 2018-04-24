import React, { Component } from 'react';
import { StripeProvider, Stripe, Elements } from 'react-stripe-elements';
import CheckoutPageOne from './CheckoutPageOne.jsx';
// import CheckoutPageTwo from './CheckoutPageTwo.jsx';
import { checkout } from '../../store/checkout';
import { connect } from 'react-redux';
import CheckoutPageTwo from './CheckoutPageTwo.jsx';
import ErrorBoundary from '../ErrorBoundary';

function CheckoutPage() {
  console.log("my props are", this.props)
    return (

    <ErrorBoundary>

      <div className ="checkoutPage">
        <div className="titleHolder">
          <h1>Checkout</h1>
        </div>
      {/* //   <div className="pageHolder">
      //     <div className="progressSidebar">
      //       <div className="trackerHolder">
      //         <h5>Check your order</h5>
      //         <div className="progressBar achieved" />
      //         <img className="checkmark" />
      //       </div>
      //       <div className="trackerHolder">
      //         <div className="progressBar" />
      //         <img className="checkmark" />
      //       </div>
      //       <div className="trackerHolder">
      //         <div className="progressBar" />
      //         <img className="checkmark" />
      //       </div>
      //       <div className="trackerHolder">
      //         <div className="progressBar" />
      //         <img className="checkmark" />
      //       </div>
      //     </div> */}
        <div className="checkoutForm">
        {/* { this.props.checkoutInfo.successOne ?
              <CheckoutPageTwo />  :

              <CheckoutPageOne /> } */}


        </div>
      </div>
      </ErrorBoundary>

    );
  }

const mapState = state => {
    return {
      user: state.user,
      checkoutInfo: state.checkoutInfo
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

