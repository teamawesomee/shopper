import React, {Component} from 'react'
import {connect} from 'react-redux'
import {editProduct} from '../store/product'
/**
 * COMPONENT
 */

 export class EditProduct extends Component {

    state = {
    error : null
    }
  
    render() {
        const id = this.props.match.params.id
      return (
        <div>
          <form onSubmit={(evt) => {
              evt.preventDefault()
              this.props.handleSubmit.call(this, evt, id)}
        }>
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
              <button type="submit">Edit Product</button>
            </div>
            {this.state.error && <div> {this.state.error.data} </div>}
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
      handleSubmit (evt, id) {
        evt.preventDefault()
        const title = evt.target.title.value
        const description = evt.target.description.value
        const price = evt.target.price.value
        const inventoryQuantity = evt.target.inventoryQuantity.value
        const category = evt.target.category.value
        const img = evt.target.img.value
        dispatch(editProduct(title, description, price, inventoryQuantity, category, img, id))
        .catch((err) => {
          console.error(err)
          this.setState({error : err})
        })
      }
    }
  }
  
  export default connect(null, mapDispatch)(EditProduct)