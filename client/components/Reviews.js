import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllProdReviews, addReview } from '../store/index'
import ErrorBoundary from './ErrorBoundary.js';

export class Reviews extends Component {
  constructor(){
    super()
    this.state = {
      writeReview: false
    }
  }
  componentDidMount(){
    this.props.getReviews(this.props.product.id)
  }

  handleChange = (event) => {
    event.preventDefault()
    if (event.target.value === "read"){
      this.setState({writeReview:false})
    }
    else if ( event.target.value === "write"){
      this.setState({writeReview: true})
    }
  }

  render(){
    const reviews = this.props.prodReviews
    return (

      <div className = 'reviewsBox'>
        <h1>Product Reviews</h1>
        <button value ="read" onClick = {this.handleChange}>READ REVIEWS</button>
        <button value ="write" onClick = {this.handleChange}>WRITE A REVIEW</button>
        {!this.state.writeReview ? reviews.map(review => {
          return (

            <div className = "review" key = {review.id}>REVIEW</div>
          )
        }):
        <div className ="pageForm">
          <form className ="formContainer" onSubmit = {this.props.handleSubmit}>
            <div>Write your review for our: {this.props.product.title} </div>
            <div className = "inputSurround stars">
              <label>Rating</label>
                <div className="radioBox inputSurround">
                  <label>1<input type ="radio" name = "rating" value ="1" /></label>
                  <label>2<input type ="radio" name = "rating" value = "2" /></label>
                  <label>3<input type ="radio" name = "rating" value = "3" /></label>
                  <label>4<input type ="radio" name = "rating" value = "4" /></label>
                  <label id="star-5">5<input type ="radio" name = "rating" value = "5" /></label>
                </div>


            </div>
            <div className ="inputSurround">
              <label htmlFor="title">Title</label>
              <input name ="title" type="text" />
            </div>
            <div className ="inputSurround">
              <label htmlFor="message">Message</label>
              <textarea name="message" type="textbox" />
            </div>
            <input type = "hidden" name="userId" value={this.props.user.id} />
            <input type = "hidden" name="productId" value={this.props.product.id} />
            <div className="buttonholder">
              <button type="submit">Submit Review</button>
            </div>
          </form>
        </div> }
      </div>
    )

  }
}

const mapState = (state) =>{
  return { user: state.user, prodReviews: state.reviews.prodReviews}
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit (event){
      event.preventDefault();
      const rating = event.target.rating.value;
      const title = event.target.title.value;
      const message = event.target.message.value;
      const userId = event.target.userId.value
      const productId = event.target.productId.value
      const newReview = { userId, productId, rating, title, message}
      dispatch(addReview(newReview))
    },
    getReviews(productId){
      dispatch(getAllProdReviews(productId))
    }
  }
}

export default connect(mapState, mapDispatch)(Reviews)
