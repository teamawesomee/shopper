import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART';
const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

/**
 * INITIAL STATE
 */
const cart = [];

/**
 * ACTION CREATORS
 */
const getCart = cart => ({ type: GET_CART, cart });
const addToCart = product => ({ type: ADD_TO_CART, product });
const removeFromCart = product => ({ type: REMOVE_FROM_CART, product });

/**
 * THUNK CREATORS
 */

export const addItemToCart = (productId) => dispatch =>
  axios
    .post(`/api/cart`, productId)
    .then(res => {
      console.log("My res.data is", res.data)
      let action = addToCart(res.data);
      dispatch(action);
    })
    .catch(err => console.log(err));

export const removeItemFromCart = (product) => {
  return (dispatch) =>
  axios
    .delete(`/api/cart/${product.id}`)
    .then(() => {
      let action = removeFromCart(product);
      dispatch(action);
    })
    .catch(err => console.log(err));
  }

export const getTheCart = () => dispatch =>
    axios
      .get('/api/cart')
      .then(res => {
        let action = getCart(res.data);
        console.log(res.data)
        dispatch(action);
      })
      .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function(state = cart, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart;
    case ADD_TO_CART:
    console.log(cart)
      return [...state, action.product];
    case REMOVE_FROM_CART:
      return [...state.filter(product => product.id !== action.product.id)];
    default:
      return state;
  }
}
