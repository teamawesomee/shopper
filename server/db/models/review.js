const Sequelize = require('sequelize');
const db = require('../db')

const Review = db.define('review', {
  rating: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
      min: 1,
      max: 5
    }
  },
  message: {
    type: Sequelize.STRING
  }

});

Review.addNewReview = function(submittedReview) {
    let myReview = Review.create({
      rating: submittedReview.rating,
      message: submittedOrder.message
    });
  
    //whichever one the order has, will be given a real value
    let userId = submittedReview.userId
    let guestId = null;
  
    if (!userId) {
      guestId = submittedReview.guestId
    }
  
  
    let prod = submittedReview.product; //this will be an array
  
    //sets the associated user
    if (userId) {
      myReview.setUser(userId);
    }
    else {
      myReview.setGuest(guestId);
    }
    //sets the associated products in line items
    myReview.addProduct(prod)
  
    return myReview;
  
  }

module.exports = Review