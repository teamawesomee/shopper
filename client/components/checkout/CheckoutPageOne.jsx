import React, { Component } from 'react';
import CartDetails from '../Cart/CartDetails.jsx';
import ErrorBoundary from '../ErrorBoundary.js';
import { checkout, successOne, successTwo } from '../../store/checkout';
import { connect } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import { onToken } from '../../store/checkout.js';

class CheckoutPageOne extends Component {
  constructor(props) {
    super(props);
      this.state = {
        name: '',
        address: '',
        email: '',
        description: '',
        currency: 'USD',
        stripeKey: '',
        total: 'Put total here later',
        amount: 1000
      }
      this.handleChange = this.handleChange.bind(this);
  }

handleChange() {

}

  render() {
    return (
      <div className="pageForm">
        <CartDetails />
        <form action="" className="formContainer">
          <div className="inputSurround">
            <label htmlFor="Name">Name</label>
            <input name="Name" type="text" value={this.state.email} />
          </div>
          <div className="inputSurround">
            <label htmlFor="address">Address</label>
            <input name="address" type="text" value={this.state.address} />
          </div>
          <div className="inputSurround">
            <label htmlFor="email">Email</label>
            <input name="email" type="text" value={this.state.email} />
          </div>
          <div className="inputSurround">
            <p>Total</p>
            <div>{this.state.total}</div>
          </div>
          {/* <ErrorBoundary> */}
            <StripeCheckout
              name={this.state.name}
              description={this.state.description}
              amount={this.state.amount}
              address={this.state.address}
              token={onToken(this.state.amount, this.state.description)}
              currency={this.state.currency}
              stripeKey={this.state.stripeKey}
            />
          {/* </ErrorBoundary> */}

          {/* <div className="inputSurround">
            <label htmlFor=""></label>
            <input type="text" value=""/>
          </div>
          <div className="inputSurround">
            <label htmlFor=""></label>
            <input type="text" value=""/>
          </div>
          <div className="inputSurround">
            <label htmlFor=""></label>
            <input type="text" value=""/>
    </div> */}
            <div className="buttonholder">
              <button onClick={this.onClick}>Next Step!</button>
              {/* <button type="submit" onClick={this.props.onClick}>Move on!</button> */}
            </div>
        </form>
      </div>

    );
  }
}


const mapState = (state) => {
  let myState = state.checkout.myCheckoutInfo;
  return {
    name:  myState.name,
    description:  myState.description,
    source:  myState.source,
    currency:  myState.currency,
    amount: myState.amount,
    stripeKey: myState.stripeKey,
    user: state.user,
    cart: state.cart
  }

}

const mapDispatch = dispatch => {
return {
  onToken(amount, description) {
    dispatch(onToken(amount, description))
  }
}
}

export default connect(mapState, mapDispatch)(CheckoutPageOne)
