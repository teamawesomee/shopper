import axios from 'axios';
import history from '../history';

//ACTION TYPES
const GET_ALL_REVIEWS = 'GET_ALL_REVIEWS';
const GET_PRODUCT_REVIEWS = 'GET_PRODUCT_REVIEWS'
const WRITE_REVIEW = 'WRITE_REVIEW';

//INTITIAL STATE
const intialState = {
  reviews: [],
  review: {},
  prodReviews: []
}

//ACTION CREATORS
const getReviews = reviews => ({type: GET_ALL_REVIEWS, reviews});
const writeReview = review => ({type: WRITE_REVIEW, review});
const getProdReviews = prodReviews => ({type: GET_PRODUCT_REVIEWS, prodReviews})

// THUNK CREATORS

export const getAllReviews = () => dispatch => {
  axios.get('/api/reviews')
    .then( res => {
      dispatch(getReviews(res.data))
    })
    .catch(err => console.log(err))
}

export const addReview = (review) => dispatch =>{
  axios.post('/api/reviews', review)
    .then( res => {
      dispatch(writeReview(res.data))
    })
    .catch(err => console.log(err))

}

export const getAllProdReviews = (productId) => dispatch =>{
  axios.get(`/api/reviews/product/${productId}`)
    .then(res => {
      dispatch(getProdReviews(res.data))
    })
    .catch(err => console.log(err))
}

// REDUCER

export default function (state = intialState, action){
  switch (action.type) {
    case GET_ALL_REVIEWS:
      return {...state, reviews: action.reviews};
    case WRITE_REVIEW:
      return {reviews: [...state.reviews, action.review ], prodReviews:[...state.prodReviews, action.review], review: action.review};
    case GET_PRODUCT_REVIEWS:
      return {...state, prodReviews: action.prodReviews}
    default:
      return state;
  }
}
