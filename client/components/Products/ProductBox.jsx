import React, { Component } from 'react';

class ProductBox extends Component {
  render() {
    return (
      <div className="product">
        <div className="imgBox">
          <img></img>
        </div>
        <div className="contentBox">
          <h3>{this.props.name}</h3>
        </div>


      </div>
    );
  }
}

export default ProductBox;
