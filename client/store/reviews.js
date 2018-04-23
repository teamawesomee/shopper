import axios from 'axios';

//ACTION TYPES
const GET_ALL_REVIEWS = 'GET_ALL_REVIEWS';
const WRITE_REVIEW = 'WRITE_REVIEW';

//INTITIAL STATE
const intialState = {
  reviews: [],
  review: {}
}

//ACTION CREATORS
const getReviews = reviews => ({type:GET_ALL_REVIEWS, reviews});
const writeReview = review => ({type:WRITE_REVIEW, review});

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
    .then( res =>{
      dispatch(writeReview(res.data))
    })
    .catch(err => console.log(err))

}

// REDUCER

export default function (state = intialState, action){
  switch (action.type) {
    case GET_ALL_REVIEWS:
      return {...state, reviews: action.reviews};
    case WRITE_REVIEW:
      return {...state, review: action.review};
    default:
      return state;
  }
}
