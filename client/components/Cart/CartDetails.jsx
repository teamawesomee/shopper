import React from 'react';
import { connect } from 'react-redux';
import { removeItemFromCart } from '../../store';

//has the product ids to an array with a count

function CartDetails(props) {
  const cart = props.cart;
  const products = props.products;
  let productsArr = []
  let productsObj = {}
  //USE PRODUCTID FROM THE CART ARRAY TO MAKE AN ARRAY OF ACTUAL PRODUCT INFO
  if (cart.length > 0 ){
    cart.forEach(productIdStr => {
      //hash the product ids to an obj
      productsObj[productIdStr] ? productsObj[productIdStr]++ : productsObj[productIdStr] = 1
    })
    const idArr = Object.keys(productsObj)
    idArr.forEach((id) => {
      const productId = Number(id)
      const productToReturn = products.filter(product => {
        return product.id === productId;
      });
      if (productToReturn[0]) productsArr.push(productToReturn[0]);
    })
  }

  return (
    cart.length ?
    <div className="orderBox">
      <div className="headerBox">
        <h3>Total Items: {cart.length}</h3>
      </div>
      <div className="productOrderBox">
        {productsArr.map( (product) => {
          return (
            <div className="singleProductOrder" key={product.title}>
              <img src={product.img} />
              <div className="orderProductDetails">
                <p>{product.title}</p>
                <p>{product.price}</p>
              </div>
              <div>
                <p> Quantity: {productsObj[product.id]}</p>
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


