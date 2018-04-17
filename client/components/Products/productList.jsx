import React, { Component } from 'react';
import ProductBox from './ProductBox.jsx';

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [{name: 'A Rock', category: ['cat1'], description: 'Your basic rock', quantity: '15', price: '$6.72'}, {name: 'A Hard Place', category: ['cat1'], description: 'sounds way more appealing than the rock', quantity: '6', price: '$6.72'}, {name: 'My Mom', category: ['cat1'], description: 'Insert mom joke here', quantity: '6', price: '$6.72'}, {name: 'YOUR mom', category: ['cat2'], description: 'insert another mom joke here', quantity: '6', price: '$6.72'}, {name: 'A dick in a box', category: ['cat2'], description: 'Step One: cut a hole in the box; Step two: put your junk in that box', quantity: '6', price: 'fucking priceless'}, {name: 'sassy comeback 101', category: ['cat2'], description: 'Step One: cut a hole in the box; Step two: put your junk in that box', quantity: '6', price: '$16.88'}],
      searchValue: '',
      selectedCategory: 'All'
    }
    this.handleChange = this.handleChange.bind(this);
    this.catHandler = this.catHandler.bind(this);

  }


handleChange(event) {
    this.setState({
        [event.target.name]: event.target.value
    })
    console.log(this.state)

}

catHandler(event){
  this.setState({
    selectedCategory: event.target.value
  })
}


  render() {
    let products = this.state.products
    if (this.state.selectedCategory != 'All'){
      products = this.state.products.filter(product => product.category.includes(this.state.selectedCategory))
    }
    let helper = []
    let prodCategories = this.state.products.map(prod => prod.category)
    for (var i = 0; i < prodCategories.length; i++){
      helper = helper.concat(prodCategories[i])
    }
    prodCategories = Array.from(new Set(helper))
    console.log("categories: ", prodCategories)
    const searchValue = this.state.searchValue;
    const regExSearchValue = new RegExp(searchValue, "gi")
    const filteredProducts = products.filter(product =>
      product.name.match(regExSearchValue));
    return (
      <div className="productPage">
      <h3>Products</h3>
      <form>
        <input name="searchValue" type="text" onChange={this.handleChange} />
        <select name ="prodCategory" onChange={this.catHandler}>
          <option value = "All">All</option>
          {prodCategories.map((cat, idx) => {
            return (
              <option key={ cat + idx } value = {cat}>{cat}</option>
            )
          })}
        </select>
      </form>
        <div className="productList">
          { filteredProducts ? filteredProducts.map(product => {
            return (
              <ProductBox product={product} key={product.name} />
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
