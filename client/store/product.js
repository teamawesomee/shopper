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
dispatch => // indentation -- KHJJ
  axios.get('/api/products')
    .then(res => {
      // console.log(res.data)
      let action = getProducts(res.data)
      console.log(action) // remove from master -- KHJJ
      dispatch(action)})
    .catch(err => console.log(err)) // this is only for development. In production we want users to see there is an error -- KHJJ

    //should be connecting to the admin route
export const addNewProduct = (title, description, price, inventoryQuantity, category, img) =>
  dispatch =>
    axios.post(`/api/users/admin/products`, { title, description, price, inventoryQuantity, category, img })
      .then(res => {
        dispatch(addProduct(res.data))
        history.push('/home') // go to the product? -- KHJJ
      })

      //should be connecting to the admin route
export const editProduct = (product) =>
  dispatch =>
    axios.put(`/api/users/admin/products/:${product.id}`, product)
      .then(res => {
        dispatch(editedProduct(res.data))
        history.push('/home')
      })

// export const getOneProductThunk = (id) => // remove me -- kHJJ
//   dispatch =>
//       axios.get(`/api/products/${d}`)
//       .then(res => {
//         dispatch(getOneProduct(res.data))
//       })
//       .catch(err => console.log(err))

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
      // map and if the id matches return the new product -- KHJJ
      return [...(state.filter(product => (product.id !== action.product.id))), action.product]
    default:
      return state
  }
}
