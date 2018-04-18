import React, { Component } from 'react';

// functional component -- KHJJ
class ProductBox extends Component {
  render() {
    const product = this.props.product;
    console.log("my product is", product)
    return (
      <div className="productBox">
        <div className="imgBox">
          {/* <img></img> */}
        </div>
        <div className="contentBox">
          <h3>{product.title}</h3>
          {/* <p>{product.description}</p> */}
          <p>{product.price}</p>
        </div>


      </div>
    );
  }
}

export default ProductBox;
