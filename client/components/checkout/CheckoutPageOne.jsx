import React, { Component } from 'react';
import CartDetails from '../Cart/CartDetails.jsx';
import ErrorBoundary from '../ErrorBoundary.js';
import { checkout, successOne, successTwo } from '../../store/checkout';
import { connect } from 'react-redux';

class CheckoutPageOne extends Component {
  constructor(props) {
    super(props);
      this.state = {
        address: '',
        email: '',
      }
      this.onClick = this.onClick.bind(this);
      this.handleChange = this.handleChange.bind(this);
  }

 onClick() {
    this.props.checkout()
    this.props.successOne()
  }

handleChange() {

}

  render() {
    return (
      <ErrorBoundary>
      <div className="pageForm">
        <CartDetails />
        <form action="" className="formContainer">
          <div className="inputSurround">
            <label htmlFor="address">Address</label>
            <input name="address" type="text" value={this.state.address} />
          </div>
          <div className="inputSurround">
            <label htmlFor="email">Email</label>
            <input name="email" type="text" value={this.state.email} />
          </div>
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
    </ErrorBoundary>
    );
  }
}


const mapState = state => {
  return {
    user: state.user,
    checkoutInfo: state.checkoutInfo
  }

}
const mapDispatch = dispatch => {
return {
  checkout(){
    dispatch(checkout());
  },
  successOne(){
    dispatch(successOne())
  },
  successTwo() {
    dispatch(successTwo());
  }
}
}

export default connect(mapState, mapDispatch)(CheckoutPageOne)
