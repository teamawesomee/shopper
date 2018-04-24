import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_ALL_ORDERS = 'GET_ALL_ORDERS';
const GET_USER_ORDERS = 'GET_USER_ORDERS';
const ADD_ORDER = 'ADD_ORDER';
const EDIT_ORDER = 'EDIT_ORDER';

/**
 * INITIAL STATE
 */
const ordersArray = [];

/**
 * ACTION CREATORS
 */
const getAllOrders = orders => ({ type: GET_ALL_ORDERS, orders });
const getUserOrders = orders => ({ type: GET_USER_ORDERS, orders });
const addOrder = order => ({ type: ADD_ORDER, order });
const editOrder = order => ({ type: EDIT_ORDER, order });

/**
 * THUNK CREATORS
 */

export const getAllOrdersAdmin = () => dispatch =>
  axios
    .get('/api/orders')
    .then(res => {
      let action = getAllOrders(res.data);
      dispatch(action);
    })
    .catch(err => console.log(err));

export const getAllOrdersUser = (user) => dispatch =>
  axios
    .get(`/api/orders/${user.id}`)
    .then(res => {
      let action = getUserOrders(res.data);
      dispatch(action);
    })
    .catch(err => console.log(err));

export const addNewOrder = (order) => dispatch =>
  axios
    .post(`/api/orders`, order)
    .then(res => {
        let action = addOrder(res.data);
        dispatch(action);
      history.push('/home');
    });

//should be connecting to the admin route
export const editOneOrder = (order) => dispatch =>
  axios
    .put(`/api/orders/${order.id}/updateStatus`, order)
    .then(res => {
      dispatch(editOrder(res.data));
    });


/**
 * REDUCER
 */
export default function(state = ordersArray, action) {
  switch (action.type) {
    case GET_ALL_ORDERS:
      return action.orders;
    case GET_USER_ORDERS:
      return action.orders;
    case ADD_ORDER:
      return [...state, action.order];
    case EDIT_ORDER:
      return [...state.filter(order => order.id !== action.order.id), action.order];
    default:
      return state;
  }
}
