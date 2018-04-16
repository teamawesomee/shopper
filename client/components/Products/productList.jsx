import React, { Component } from 'react';
import ProductBox from './ProductBox.jsx';

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [{name: 'A Rock', description: '', quantity: '6', price: '$6.72'}]
    }
  }

  render() {
    return (
      <div>
        {

        <ProductBox />
        }
      </div>
    );
  }
}

export default ProductList;
