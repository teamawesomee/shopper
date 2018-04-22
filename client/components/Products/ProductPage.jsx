import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addItemToCart } from '../../store';

class ProductPage extends Component {
  render() {
    const productId = +this.props.match.params.productId;
    const products = this.props.products;
    let product = products.filter(oneProduct => {
      return oneProduct.id === productId
    });
    product = product[0];
    return (
    <div>
      {product.id ?
      <div className="productPage">
        <div className="imgBox">
          <img src= {product.img}/>
        </div>
        <div className="infoAndBtns">
          <div className="contentBox">
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p>{product.price}</p>
          </div>
          <div className="buttons">
            <button value={product.id} onClick={this.props.addItemToCart}>
              Add to cart
            </button>
          {this.props.user.isAdmin &&
                <Link to={`/products/${product.id}/edit`}><button disabled={!this.props.user.isAdmin}>Edit</button></Link>}
          </div>
        </div>
      </div> : <div className="alert">No product to display</div>
        }
        </div>
    );
  }
}


const mapDispatchToProps = dispatch => {
  return {
    addItemToCart(evt){
      evt.preventDefault();
      dispatch(addItemToCart({productId: evt.target.value}));
    }
  };
};

const mapStateToProps = state => {
  return {
    products: state.products,
    user: state.user
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
