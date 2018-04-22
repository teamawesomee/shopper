import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


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
        <div className="contentBox">
          <h3>{product.title}</h3>
          <p>{product.description}</p>
          <p>{product.price}</p>
        </div>
      </div> : <div className="alert">No product to display</div>
        }
        {this.props.user.isAdmin &&
          <div>
              <Link to={`/products/${product.id}/edit`}><button disabled={!this.props.user.isAdmin}>edit</button></Link>
          </div>}
        </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    products: state.products,
    user: state.user
  };
};

export default connect(mapStateToProps, null)(ProductPage);
