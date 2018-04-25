import axios from 'axios';
import PAYMENT_SERVER_URL from '../components/checkout/constants/server';
import STRIPE_PUBLISHABLE from '../components/checkout/constants/stripe';



/**
 * ACTION TYPES
 */
const CHECKOUT = 'CHECKOUT';
const GET_API_KEY = 'GET_API_KEY';
const STEP_ONE_SUCCESS = 'STEP_ONE_SUCCESS';
const STEP_TWO_SUCCESS = 'STEP_TWO+SUCCESS';


 /**
  * INITIAL STATE
  */
const checkoutInfo = {
  stepOne: false,
  stepTwo: false,
  myCheckoutInfo: {
    name: '',
    description: '',
    source: '',
    currency: '',
    amount: '',
    stripeKey: STRIPE_PUBLISHABLE
  }
}

/**
 * ACTION CREATORS
 */

 const checkoutAction = checkoutObject => ({type: CHECKOUT, checkoutObject});
 const setStepOneSuccess = successStatus => ({type: STEP_ONE_SUCCESS, successStatus})
 const setStepTwoSuccess = successStatus => ({type: STEP_TWO_SUCCESS, successStatus})

 /**
  * THUNK CREATORS
  */

  const successPayment = data => {
    alert('Payment Successful');
  }

const errorPayment = data => {
  alert('Payment Error');
}

  export const checkout = (checkoutObject) => dispatch => {
    axios
      .post('/api/orders', checkoutObject)
      .then(res => {
        let action = checkoutAction(res.data);
        dispatch(action)
      })
      .catch(err => console.log(err));
    }

  export const successOne = (boolean) => dispatch => {
      let action = setStepOneSuccess(boolean);
      dispatch(action)
  }
  export const successTwo = (boolean) => dispatch => {
      let action = setStepTwoSuccess(boolean);
      dispatch(action)
  }

  export const onToken = (stripeCheckout) => token =>
    axios.post(PAYMENT_SERVER_URL, {
      stripeCheckout
    })
    .then(successPayment)
    .catch(errorPayment);




                            /* REDUCER */
export default function(state = checkoutInfo, action) {
  switch (action.type) {
    case GET_API_KEY:

      break;
    case CHECKOUT:
      return {checkoutInfo: action.checkoutInfo}

    case STEP_ONE_SUCCESS:
      state.stepOne = action.successStatus;
      return state;

    case STEP_TWO_SUCCESS:
      return {stepTwo: action.successStatus}

    default:
      return state;
  }
}
