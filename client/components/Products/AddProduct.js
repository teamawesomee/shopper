import React from 'react'
import {connect} from 'react-redux'
import {addNewProduct} from '../../store'

/**
 * COMPONENT
 */
export function AddProduct(){
      return (
        <div className="pageForm">
          <div className="titleHolder">
            <h1>Add a product!</h1>
          </div>
          {!this.props.user.isAdmin ? <div className="alert">You must be an admin to add a Product</div> :
          <form onSubmit={ this.props.handleSubmit } className="formContainer">
            <div className="inputSurround">
              <label htmlFor="title"><small>Title</small></label>
              <input name="title" type="text" />
            </div>
            <div className="inputSurround">
              <label htmlFor="description"><small>Description</small></label>
              <textarea name="description" type="textbox"/>
            </div>
            <div className="inputSurround">
              <label htmlFor="price"><small>Price</small></label>
              <input name="price" type="text" />
            </div>
            <div className="inputSurround">
              <label htmlFor="inventoryQuantity"><small>Inventory Quantity</small></label>
              <input name="inventoryQuantity" type="text" />
            </div>
            <div className="inputSurround">
              <label htmlFor="category"><small>Category</small></label>
              <input name="category" type="text" />
            </div>
            <div className="inputSurround">
              <label htmlFor="img"><small>Image</small></label>
              <input name="img" type="text" />
            </div>
            <div className="buttonholder">
              <button type="submit">Add Product</button>
            </div>
          </form>
          }
        </div>
        )
    }


  /**
   * CONTAINER
   */

   const mapState = (state) => {
     return {user: state.user}
   }

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

  export default connect(mapState, mapDispatch)(AddProduct)
