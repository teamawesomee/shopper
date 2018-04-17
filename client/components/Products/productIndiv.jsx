import React, { Component } from 'react';

class ProductPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: {}
    }
  }

  render() {
    return (
      <div>
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

export default ProductPage;
