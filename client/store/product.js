import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_PRODUCTS = 'GET_PRODUCTS'
const ADD_PRODUCT = 'ADD_PRODUCT'
const EDIT_PRODUCT = 'EDIT_PRODUCT'
const GET_PRODUCT = 'GET_PRODUCT'

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
const getOneProduct = product => ({type: GET_PRODUCT, product})

/**
 * THUNK CREATORS
 */

export const getAllProducts = () =>
dispatch =>
  axios.get('/api/products')
    .then(res => {
      let action = getProducts(res.data)
      dispatch(action)})
    .catch(err => console.log(err))

    //should be for admins only
export const addNewProduct = (title, description, price, inventoryQuantity, category, img) =>
  dispatch =>
    axios.post(`/api/products`, { title, description, price, inventoryQuantity, category, img })
      .then(res => {
        dispatch(addProduct(res.data))
        history.push('/home')
      })

      //should be for admins only
export const editProduct = (title, description, price, inventoryQuantity, category, img, id) =>
  dispatch =>
    axios.put(`/api/products/:${id}`, { title, description, price, inventoryQuantity, category, img })
      .then(res => {
        dispatch(editedProduct(res.data))
        history.push('/home')
      })


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
