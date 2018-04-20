import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addItemToCart } from '../../store';

<<<<<<< HEAD
=======
const mapStateToProps = (state) => {
  return { products: state.products,
  user: state.user };
};
>>>>>>> 40f6813398b4b2fab1d9af586495f8fb5efa6803

class ProductPage extends Component {
  render() {
    const productId = +this.props.match.params.productId;

    const products = this.props.products;
    let product = products.filter(oneProduct => {
      return oneProduct.id == productId
    });
    product = product[0];
<<<<<<< HEAD
    return product ? <div className="productPage">
        <div className="imgBox">{/* <img></img> */}</div>
=======
    return (
    <div>
      {product ?
      <div className="productPage">
        <div className="imgBox">
          {/* <img></img> */}
        </div>
>>>>>>> 40f6813398b4b2fab1d9af586495f8fb5efa6803
        <div className="contentBox">
          <h3>{product.title}</h3>
          <p>{product.description}</p>
          <p>{product.price}</p>
        </div>
<<<<<<< HEAD
        <div>
          <button value={productId} onClick={this.props.addItemToCart}>
            Add to cart
          </button>
        </div>
      </div> : <div className="alert">No product to display</div>;
=======
      </div> : <div className="alert">No product to display</div>
        }
        {this.props.user.isAdmin &&
          <div>
              <Link to={`/products/${product.id}/edit`}><button disabled={!this.props.user.isAdmin}>edit</button></Link>
          </div>}
        </div>
    );
>>>>>>> 40f6813398b4b2fab1d9af586495f8fb5efa6803
  }
}

const mapStateToProps = state => {
  return { 
    products: state.products 
  };
};


const mapDispatchToProps = dispatch => {
  return {
    addItemToCart(evt){
      evt.preventDefault();
      console.log(evt.target.value)
      dispatch(addItemToCart(evt.target.value));
    }
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
