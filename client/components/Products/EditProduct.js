import React, {Component} from 'react'
import {connect} from 'react-redux'
import {editProduct} from '../../store/product'
/**
 * COMPONENT
 */

 export class EditProduct extends Component {

    render() {
      const id = this.props.match.params.productId
      const product = this.props.products.filter(product => product.id === Number(this.props.match.params.productId))[0]
      return (
        <div>
          <form onSubmit={(evt) => {
              evt.preventDefault()
              this.props.handleSubmit.call(this, evt, id)}
            }>
            <div>
              <label htmlFor="title"><small>Title</small></label>
              <input name="title" defaultValue= {product.title} type="text" />
            </div>
            <div>
              <label htmlFor="description"><small>Description</small></label>
              <input name="description" defaultValue= {product.description} type="text" />
            </div>
            <div>
              <label htmlFor="price"><small>Price</small></label>
              <input name="price" type="text" defaultValue= {product.price}/>
            </div>
            <div>
              <label htmlFor="inventoryQuantity"><small>Inventory Quantity</small></label>
              <input name="inventoryQuantity" type="text" defaultValue= {product.inventoryQuantity} />
            </div>
            <div>
              <label htmlFor="category"><small>Category</small></label>
              <input name="category" type="text" defaultValue= {product.category} />
            </div>
            <div>
              <label htmlFor="img"><small>Image</small></label>
              <input name="img" type="text" defaultValue= {product.img}/>
            </div>
            <div>
              <button type="submit">Edit Product</button>
            </div>
          </form>
        </div>
        )
    }

  }

  /**
   * CONTAINER
   */
  const mapState = (state) =>{
    return {products: state.products}
  }

  const mapDispatch = (dispatch) => {
    return {
      handleSubmit (evt, id) {
        evt.preventDefault()
        const title = evt.target.title.value
        const description = evt.target.description.value
        const price = evt.target.price.value
        const inventoryQuantity = evt.target.inventoryQuantity.value
        let category = []
        let textCategories = evt.target.category.value
        textCategories.split(',').forEach(word => category.push(word.trim()))
        const img = evt.target.img.value
        const editedProd = {title, description, price, inventoryQuantity, category, img, id}
        dispatch(editProduct(editedProd))
      }
    }
  }

  export default connect(mapState, mapDispatch)(EditProduct)
