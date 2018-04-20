import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_ALL_ORDERS';
const ADD_TO_CART = 'GET_USER_ORDERS';
const REMOVE_FROM_CART = 'ADD_ORDER';

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
    .get(`/api/products/${productId}`)
    .then(res => {
      let action = addItemToCart(res.data);
      dispatch(action);
    })
    .catch(err => console.log(err));

// export const getAllOrdersUser = user => dispatch =>
//   axios
//     .get(`/api/orders/${user.id}`)
//     .then(res => {
//       let action = getUserOrders(res.data);
//       dispatch(action);
//     })
//     .catch(err => console.log(err));

// export const addNewOrder = order => dispatch =>
//   axios.post(`/api/orders`, order).then(res => {
//     let action = addOrder(res.data);
//     dispatch(action);
//     history.push('/home');
//   });

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
    default:
      return state;
  }
}
