import React, { Component } from 'react';
import { connect } from 'react-redux';

export class Reviews extends Component {
  constructor(){
    super()
    this.state = {
      writeReview: false
    }
  }

  handleChange = (event) => {
    event.preventDefault()
    if (event.target.value === "read"){
      console.log("set to false")
      this.setState({writeReview:false})
    }
    else if( event.target.value === "write"){
      console.log("set to true")
      this.setState({writeReview: true})
    }
  }

  render(){
    const reviews = this.props.reviews
    console.log("props:", this.props)
    return(
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
          <form className ="formContainer">
            <div>Write your review for our: {this.props.product.title} </div>
            <div className = "inputSurround">
              <label>Rating</label>
              <label>1<input type ="radio" name = "star" value ="1" /></label>
              <label>2<input type ="radio" name = "star" value = "2" /></label>
              <label>3<input type ="radio" name = "star" value = "3" /></label>
              <label>4<input type ="radio" name = "star" value = "4" /></label>
              <label>5<input type ="radio" name = "star" value = "5" /></label>
            </div>
            <div className ="inputSurround">
              <label htmlFor="title">Title</label>
              <input type="text"/>
            </div>
            <div className ="inputSurround">
              <label htmlFor="review">Review</label>
              <textarea type="textbox"/>
            </div>
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
  return {reviews: state.reviews.reviews, review: state.reviews.review}
}


export default connect(mapState, null)(Reviews)
