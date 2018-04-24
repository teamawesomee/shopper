import React from 'react';
import { connect } from 'react-redux';
import { removeItemFromCart } from '../../store';

//based on backend routes i may need to pass in the userId and the product

function CartDetails(props) {
  const cart = props.cart;
  return (
    cart.length ?
    <div className="orderBox">
      <div className="headerBox">
        <h3>Total Items: {cart.length}</h3>
      </div>
      <div className="productOrderBox">
        {cart.map(product => {
          return (
            <div className="singleProductOrder" key={product.title}>
              <img src={product.img} />
              <div className="orderProductDetails">
                <p>{product.title}</p>
                <p>{product.price}</p>
              </div>
              <div className="orderBtn">
                <button onClick={() => props.removeItemFromCart(product)}>Remove</button>
              </div>
            </div>
          );
        })}
      </div>
    </div> :
    <div className="alertHolder">
      <div className="alert">Your Cart is Empty</div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    cart: state.cart,
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeItemFromCart(product) {
      dispatch(removeItemFromCart(product));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartDetails);


