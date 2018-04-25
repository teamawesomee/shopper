import React from 'react';
import { connect } from 'react-redux';

function CartIcon (props) {
  const cart = props.cart;
  let totalItems;
  if (cart.length > 0){
    totalItems = cart.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
  }

  return (
    <div className="cartIcon">
        <div className="cartTotal">
            <p> {totalItems} </p>
        </div>
        <img src="https://cdn4.iconfinder.com/data/icons/rounded-solid-outline-shopping-e-commerce-icons-se/144/Shopping_Cart_Rounded_Solid-512.png" />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    cart: state.cart,
  };
};

export default connect(mapStateToProps)(CartIcon);
