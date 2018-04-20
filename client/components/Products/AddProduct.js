import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addNewProduct} from '../../store'

/**
 * COMPONENT
 */
export class AddProduct extends Component {
    constructor(){
      super()
      this.state = {

      }
    }

    render() {
      return (
        <div>
          <form onSubmit={ this.props.handleSubmit }>
            <div>
              <label htmlFor="title"><small>Title</small></label>
              <input name="title" type="text" />
            </div>
            <div>
              <label htmlFor="description"><small>Description</small></label>
              <input name="description" type="text" />
            </div>
            <div>
              <label htmlFor="price"><small>Price</small></label>
              <input name="price" type="text" />
            </div>
            <div>
              <label htmlFor="inventoryQuantity"><small>Inventory Quantity</small></label>
              <input name="inventoryQuantity" type="text" />
            </div>
            <div>
              <label htmlFor="category"><small>Category</small></label>
              <input name="category" type="text" />
            </div>
            <div>
              <label htmlFor="img"><small>Image</small></label>
              <input name="img" type="text" />
            </div>
            <div>
              <button type="submit">Add Product</button>
            </div>
            {this.state.error && <div className="alert"> {this.state.error.data} </div>}
          </form>
        </div>
        )
    }

  }

  /**
   * CONTAINER
   */

  const mapDispatch = (dispatch) => {
    return {
      handleSubmit (evt) {
        evt.preventDefault()
        const title = evt.target.title.value
        const description = evt.target.description.value
        const price = evt.target.price.value
        const inventoryQuantity = evt.target.inventoryQuantity.value
        let category = []
        let textCategories = evt.target.category.value
        textCategories.split(',').forEach(word => category.push(word.trim()))
        const img = evt.target.img.value
        const newProd = {title, description, price, inventoryQuantity, category, img}
        dispatch(addNewProduct(newProd))
      }
    }
  }

  export default connect(null, mapDispatch)(AddProduct)
