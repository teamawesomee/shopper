import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_PRODUCTS = 'GET_PRODUCTS'
const ADD_PRODUCT = 'ADD_PRODUCT'
const EDIT_PRODUCT = 'EDIT_PRODUCT'


/**
 * INITIAL STATE
 */
const productsArray = []

/**
 * ACTION CREATORS
 */
const getProducts = products => ({type: GET_PRODUCTS, products})
const addProduct = product => ({type: ADD_PRODUCT, product})
const editedProduct = product => ({type: EDIT_PRODUCT, product})

/**
 * THUNK CREATORS
 */

export const getAllProducts = () =>
dispatch =>
  axios.get('/api/products')
    .then(res => {
      dispatch(getProducts(res.data))})
    .catch(err => console.log(err))

    //should be for admins only
export const addNewProduct = (newProd) =>
  dispatch =>
    axios.post(`/api/products`, newProd)
      .then(res => res.data)
      .then(product => {
        dispatch(addProduct(product))
        history.push(`/products/${product.id}`)
      })
      .catch(err => console.log(err))

      //should be for admins only
export const editProduct = (editedProd) =>
  dispatch =>
    axios.put(`/api/products/${editedProd.id}`, editedProd)
      .then(res => {
        dispatch(editedProduct(res.data))
        history.push(`/products/${editedProd.id}`)
      })
      .catch(err => console.log(err))


/**
 * REDUCER
 */
export default function (state = productsArray, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return  action.products
    case ADD_PRODUCT:
      return [...state, action.product]
    case EDIT_PRODUCT:
      return [...(state.filter(product => (product.id !== action.product.id))), action.product]
    default:
      return state
  }
}
