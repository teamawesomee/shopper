import React from 'react';
import { connect } from 'react-redux';
import { removeItemFromCart } from '../../store';

//want to show a cart with only unique items (newSet?)
//want to calculate quantity for each item (reduce)

function CartDetails(props) {
  const cart = props.cart;
  const products = props.products;
  const productsArr = []
  cart.forEach((entry) => {
    let productId = entry.productId;
    const [productToReturn] = products.filter((product) => {
      return product.id === productId
    })
    productsArr.push(productToReturn)
  })

  return (
    cart.length ?
    <div className="orderBox">
      <div className="headerBox">
        <h3>Total Items: {cart.length}</h3>
      </div>
      <div className="productOrderBox">
        {productsArr.map( (product, index) => {
          return (
            <div className="singleProductOrder" key={product.title}>
              <img src={product.img} />
              <div className="orderProductDetails">
                <p>{product.title}</p>
                <p>{product.price}</p>
              </div>
              <div>
                <p> Quantity: {cart[index].quantity}</p>
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
    user: state.user,
    products: state.products
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


