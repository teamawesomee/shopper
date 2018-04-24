import axios from 'axios';



/**
 * ACTION TYPES
 */
const CHECKOUT = 'CHECKOUT';
const GET_API_KEY = 'GET_API_KEY';


 /**
  * INITIAL STATE
  */
const stripeState = {
  apiKey: 'pk_test_I4irKTfvhc4aXA6UzFIOvueM',
  checkoutInfo: {}
};

export default function(state = stripeState, action) {
  switch (action.type) {
    case GET_API_KEY:

      break;
    case CHECKOUT:
      return {apiKey: state.apiKey, checkoutInfo: action.checkoutInfo}

    default:
      break;
  }
}
