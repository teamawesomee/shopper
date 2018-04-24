import axios from 'axios';



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
  stepOne: {},
  stepTwo: {},
  myCheckoutInfo: {}
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

  export const checkout = (checkoutObject) => dispatch =>{
    axios
      .post('/api/orders', checkoutObject)
      .then(res => {
        let action = checkoutAction(res.data);
        dispatch(action)
      })
      .catch(err => console.log(err));}

  export const successOne = (boolean) => dispatch => {
      let action = setStepOneSuccess(boolean);
      dispatch(action)
  }
  export const successTwo = (boolean) => dispatch => {
      let action = setStepTwoSuccess(boolean);
      dispatch(action)
  }



                            /* REDUCER */
export default function(state = checkoutInfo, action) {
  switch (action.type) {
    case GET_API_KEY:

      break;
    case CHECKOUT:
      return {checkoutInfo: action.checkoutInfo}

    case STEP_ONE_SUCCESS:
      return {stepOne: action.successStatus}

    case STEP_TWO_SUCCESS:
      return {stepTwo: action.successStatus}

    default:
      return state;
  }
}
