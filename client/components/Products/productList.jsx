import React, { Component } from 'react';
import ProductBox from './ProductBox.jsx';

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [{name: 'A Rock', description: '', quantity: '6', price: '$6.72'}, {name: 'A Hard Place', description: '', quantity: '6', price: '$6.72'}]
    }
  }

  render() {
    const products = this.state.products;
    return (
      <div className="productList">
        <h3>Products</h3>
        { products && products.map(product => {
          return (
            <ProductBox product={product} key={product.name} />

          )
        })
        }
      </div>
    );
  }
}

export default ProductList;
