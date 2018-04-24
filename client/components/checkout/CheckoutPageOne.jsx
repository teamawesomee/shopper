import React, { Component } from 'react';
import CartDetails from '../Cart/CartDetails.jsx';

class CheckoutPageOne extends Component {
  constructor(props) {
    super(props);
      this.state = {
        address: '',
        email: '',
      }
  }

  render() {
    return (
      <div className="pageForm">
        <CartDetails />
        <form action="" className="formContainer">
          <div className="inputSurround">
            <label htmlFor="address">Address</label>
            <input name="address" type="text" value={this.state.address} />
          </div>
          <div className="inputSurround">
            <label htmlFor="email">Email</label>
            <input name="email" type="text" value={this.state.email}/>
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
          </div>
          <div className="buttonholder">
            <button>Move on!</button>
          </div> */}
        </form>
      </div>
    );
  }
}

export default CheckoutPageOne;
