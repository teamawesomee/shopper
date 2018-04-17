import React, { Component } from 'react';

class ProductBox extends Component {
  render() {
    const product = this.props.product;
    console.log("my product is", product)
    return (
      <div className="product">
        <div className="imgBox">
          <img></img>
        </div>
        <div className="contentBox">
          <h3>{product.name}</h3>

          <p>{product.description}</p>

          <p>{product.price}</p>
        </div>


      </div>
    );
  }
}

export default ProductBox;
