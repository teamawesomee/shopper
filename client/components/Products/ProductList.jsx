import React, {Component} from 'react';
import ProductBox from './ProductBox.jsx';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
      selectedCategory: 'All'
    }
  }


                              /* METHODS */

handleChange = (event) => {
    this.setState({
        [event.target.name]: event.target.value
    })
}

                                /* JSX */
render (){
    let products = this.props.products
    //if the selected category is not 'all', the "products" variable only includes items that are of the selected category
    if (this.state.selectedCategory != 'All'){
      products = this.props.products.filter(product => product.category.includes(this.state.selectedCategory))
    }
    // set helper array
    let helper = []

    //collect product categories from the products we have
    let prodCategories = this.props.products.map(prod => prod.category)
    //and then concatenate them onto the end of the helper array to get one long array
    for (var i = 0; i < prodCategories.length; i++){
      helper = helper.concat(prodCategories[i])
    }

    //this is the final array of our products
    prodCategories = Array.from(new Set(helper))

    //this is for filtering by name
    const searchValue = this.state.searchValue;
    const regExSearchValue = new RegExp(searchValue, "gi")
    const filteredProducts = products.filter(product =>
      product.title.match(regExSearchValue));

                      /* RETURN STATEMENT */
    return (
      <div className="productPage page">
        <h1>Products</h1>
        <form className="formContainer">
          <div className="inputSurround">
            <label htmlFor="searchValue">Search by name!</label>
            <input  name="searchValue" type="text" onChange={this.handleChange} />
          </div>

          <div className="inputSurround">
              <label htmlFor="selectedCategory">Filter by Category</label>
              <select name ="selectedCategory" onChange={this.handleChange}>
                <option value = "All">All</option>
                {/* this maps through our product categories within the dropdown selector */}
                {prodCategories.map((cat, idx) => {
                  return (
                    <option key={ cat + idx } value = {cat}>{cat}</option>
                  )
                })}
              </select>
            </div>
            {this.props.user.isAdmin &&
            <div>
                <Link to='/addProduct'><button disabled={!this.props.user.isAdmin}>Add Product</button></Link>
            </div>}
        </form>
                                  {/* PRODUCT LIST */}
        <div className="productList">
          {filteredProducts.map(product => { //if filteredProducts is not empty map through it
            return (
              <Link to={`/products/${product.id}`} key={product.title} className="product">
                <ProductBox product={product}  />
              </Link>
            )
          })}
          {filteredProducts.length === 0 && searchValue && <div className="alert"> <p>Sorry, there are no products that match your search!</p> </div>}
        </div>
      </div>
    );
  }
}

// -----containers-----

const mapState = (state) => ({...state});
export default connect(mapState, null)(ProductList);
