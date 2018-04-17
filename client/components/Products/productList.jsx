import React, { Component } from 'react';
import ProductBox from './ProductBox.jsx';
import { Link } from 'react-router-dom';

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [{name: 'A Rock', description: 'Your basic rock', quantity: '15', price: '$6.72'}, {name: 'A Hard Place', id: '1', description: 'sounds way more appealing than the rock', quantity: '6', price: '$6.72'}, {name: 'My Mom', id: '2', description: 'Insert mom joke here', quantity: '6', price: '$6.72'}, {name: 'YOUR mom', id: '3', description: 'insert another mom joke here', quantity: '6', price: '$6.72'}, {name: 'A dick in a box', id: '4', description: 'Step One: cut a hole in the box; Step two: put your junk in that box', quantity: '6', price: 'fucking priceless'}, {name: 'sassy comeback 101', id: '5', description: 'Step One: cut a hole in the box; Step two: put your junk in that box', quantity: '6', price: '$16.88'}],
      searchValue: ''
    }
    this.handleChange = this.handleChange.bind(this);
  }


handleChange(event) {
    this.setState({
        [event.target.name]: event.target.value
    })
    console.log(this.state)

}


  render() {
    const products = this.state.products;
    const searchValue = this.state.searchValue;
    const regExSearchValue = new RegExp(searchValue, "gi")
    const filteredProducts = products.filter(product =>
      product.name.match(regExSearchValue));
    return (
      <div className="productPage">
      <h1>Products</h1>
      <form>
      <input name="searchValue" type="text" onChange={this.handleChange} />
      </form>
        <div className="productList">
          { filteredProducts ? filteredProducts.map(product => {
            return (
              <Link to={`/products/${product.id}`} key={product.name} params={{product: {product}}}>
                <ProductBox product={product}  />
              </Link>
            )
          }) : products.map(product => {
            return (
              <ProductBox product={product} key={product.name} />
            )
          })
          }
        </div>


      </div>
    );
  }
}

export default ProductList;
