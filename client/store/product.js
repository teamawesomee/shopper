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
const initialProducts = []

/**
 * ACTION CREATORS
 */
const getProducts = products => ({type: GET_PRODUCTS, products})
const addProduct = product => ({type: ADD_PRODUCT, product})
const edittedProduct = product => ({type: EDIT_PRODUCT, product})

/**
 * THUNK CREATORS
 */

export const getAllProducts = () =>
dispatch =>
  axios.get('/products')
    .then(res =>
      dispatch(getProducts(res.data || initialProducts)))
    .catch(err => console.log(err))

export const addNewProduct = (title, description, price, inventoryQuantity, category, img) =>
  dispatch =>
    axios.post(`/products`, { title, description, price, inventoryQuantity, category, img })
      .then(res => {
        dispatch(addProduct(res.data))
        history.push('/home')
      })

export const editProduct = (title, description, price, inventoryQuantity, category, img, id) =>
  dispatch =>
    axios.put(`/products/:${id}`, { title, description, price, inventoryQuantity, category, img })
      .then(res => {
        dispatch(edittedProduct(res.data))
        //history.push('/home')
      })

/**
 * REDUCER
 */
export default function (state = initialProducts, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products
    case ADD_PRODUCT:
      return [...state, action.product]
    case EDIT_PRODUCT:
      return [...(state.filter(product => (product.id !== action.product.id))), action.product]
    default:
      return state
  }
}
