import React, { Component } from 'react';
import ProductBox from './ProductBox.jsx';

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [{name: 'A Rock', description: 'Your basic rock', quantity: '15', price: '$6.72'}, {name: 'A Hard Place', description: 'sounds way more appealing than the rock', quantity: '6', price: '$6.72'}, {name: 'My Mom', description: 'Insert mom joke here', quantity: '6', price: '$6.72'}, {name: 'YOUR mom', description: 'insert another mom joke here', quantity: '6', price: '$6.72'}, {name: 'A dick in a box', description: 'Step One: cut a hole in the box; Step two: put your junk in that box', quantity: '6', price: 'fucking priceless'}, {name: 'sassy comeback 101', description: 'Step One: cut a hole in the box; Step two: put your junk in that box', quantity: '6', price: '$16.88'}]
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
