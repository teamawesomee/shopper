import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART';
const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const CLEAR_CART = 'CLEAR_CART';

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
const clearCart = () => ({ type: CLEAR_CART});

/**
 * THUNK CREATORS
 */

export const addItemToCart = (productId) => dispatch =>
  axios
    .post(`/api/cart`, productId)
    .then(res => {
      let action = getCart(res.data);
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

export const getTheCart = () => dispatch => {
    console.log("in get cart thunk")
    axios
      .get('/api/cart')
      .then(res => {
        console.log("res is...", res)
        console.log("res.data is...", res.data)
        let action = getCart(res.data);
        dispatch(action);
      })
      .catch(err => console.log(err))
    }

export const clearCurrentCart = () => dispatch => {
  let action = clearCart();
  dispatch(action);
}

/**
 * REDUCER
 */
export default function(state = cart, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart;
    case ADD_TO_CART:
      return [...state, action.product];
    case REMOVE_FROM_CART:
      return [...state.filter(product => product.id !== action.product.id)];
    case CLEAR_CART:
      return [];
    default:
      return state;
  }
}
