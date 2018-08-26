import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addItemToCart, deleteProd, addGuestItemToCart } from '../../store';
import Reviews from '../Reviews'
import ErrorBoundary from '../ErrorBoundary.js';

class ProductPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false
    }
    this.onClickenzee = this.onClickenzee.bind(this)
  }

  onClickenzee = (evt) => {
      if (this.props.user.id){
        this.props.addItemToCart(evt)
      }
      else {
        this.props.addGuestItemToCart(evt)
      }
      this.setState({success: true})
      setTimeout(() => {
        this.setState({success: false})
      }, 3000)
    }

  render() {
    const productId = +this.props.match.params.productId;
    const products = this.props.products;
    let product = products.filter(oneProduct => {
      return oneProduct.id === productId
    });
    product = product[0];
    return (
    <div className="productPage">
      {product ?
      <div className="productDetailBox">
        <div className="imgBox">
          <img src= {product.img} />
        </div>
        <div className="infoAndBtns">
          <div className="contentBox">
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p>{product.price}</p>
          </div>
          <div className="buttons">
            <button value={product.id} onClick={this.onClickenzee}>
              Add to cart
            </button>
          {this.props.user.isAdmin &&
                <Link to={`/products/${product.id}/edit`}><button disabled={!this.props.user.isAdmin}>Edit Product</button></Link>}
          {this.props.user.isAdmin &&
                <button onClick ={(evt) => this.props.clickHandler(evt, product)} disabled={!this.props.user.isAdmin}>Delete Product</button>}
          </div>

        </div>

      </div> : <div className="alert">No product to display</div>
        }
        {this.state.success ? <div className="alertHolder success"><div className="alert success"> <p>The item has been added to your cart!</p> </div></div> : null
        }
        <ErrorBoundary>
          <Reviews product={product}/>
        </ErrorBoundary>
        </div>
    );
  }
}


const mapDispatchToProps = dispatch => {
  return {
    addItemToCart(evt){
      evt.preventDefault();
      dispatch(addItemToCart({productId: evt.target.value}))
    },
    clickHandler(evt, product){
      evt.preventDefault();
      dispatch(deleteProd(product))
    },
    addGuestItemToCart(evt){
      evt.preventDefault();
      dispatch(addGuestItemToCart(evt.target.value))
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
