// be consistent on casing (caps, kebab, camel) -- KHJJ
import React, { Component } from 'react';
import ProductBox from './ProductBox.jsx';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {getAllProducts} from '../../store/product';

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
      selectedCategory: 'All'
    }
    //binding our methods
    this.handleChange = this.handleChange.bind(this);
    this.catHandler = this.catHandler.bind(this);

  }

  componentDidMount(){
    this.props.getAll();
  }

                              /* METHODS */

// indentation and spacing!??! -- KHJJ

handleChange(event) { // make arrow functions so you don't have to bind -- KHJJ
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



                                /* JSX */
  render() {

    let products = this.state.selectedCategory === 'All' ? this.props.products : this.props.products.filter(product => product.category.includes(this.state.selectedCategory)) // this instead of if below -- KHJJ

    console.log("my products are", products)
    //if the selected category is not 'all', the "products" variable only includes items that are of the selected category
    if (this.state.selectedCategory != 'All'){
      products = this.props.products.filter(product => product.category.includes(this.state.selectedCategory))
    }
    // set helper array
    let helper = new Set()

    //collect product categories from the products we have
    let prodCategories = this.props.products.map(prod => prod.category)
    //and then concatenate them onto the end of the helper array to get one long array
    // based on your filter and map let's use foreach -- KHJJ
    for (var i = 0; i < prodCategories.length; i++){
      helper = helper.add(prodCategories[i])
    }

    //this is the final array of our products
    prodCategories = Array.from(helper)

    //this is for filtering by name
    const searchValue = this.state.searchValue;
    const regExSearchValue = new RegExp(searchValue, "gi")
    const filteredProducts = products.filter(product =>
      product.title.match(regExSearchValue));



      // console log
    console.log("categories: ", prodCategories)

                      /* RETURN STATEMENT */
    return (
      <div className="productPage">
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
        </form>
                                  {/* PRODUCT LIST */}
        <div className="productList">
          { filteredProducts ? filteredProducts.map(product => { //if filteredProducts is not empty map through it
            return (
              <Link to={`/products/${product.id}`} key={product.title} className="product">
                <ProductBox product={product}  />
              </Link>
            )
          }) : products.map(product => { //if filteredProducts is empty map through products!
            return (
              <Link to={`/products/${product.id}`} key={product.title} className="product">
                <ProductBox product={product} key={product.title} />
              </Link>
            )
          })
          /* see what happens if you just look at filtered.map -- KHJJ */
          }
          {filteredProducts.length === 0 && searchValue && <div className="alert"> <p>Sorry, there are no products that match your search!</p> </div>}


        </div>


      </div>
    );
  }
}

// -----containers-----

const mapState = (state) => ({...state});
const mapDispatch = (dispatch) => {
   return {getAll() {
    dispatch(getAllProducts())
  }}
}




export default connect(mapState, mapDispatch)(ProductList);
