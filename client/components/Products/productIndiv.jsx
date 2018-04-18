import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return { selectedProduct: state.selectedProduct };
};

class ProductPage extends Component {


  render() {
    const product = this.state.selectedProduct;
    console.log(product)
    return (
      <div>
        <div className="imgBox">
          {/* <img></img> */}
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



export default connect(mapStateToProps)(ProductPage);
