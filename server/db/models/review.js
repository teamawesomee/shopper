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
  title: {
    type: Sequelize.STRING
  },
  message: {
    type: Sequelize.TEXT
  },
  userId: {
    type: Sequelize.INTEGER
  },
  productId: {
    type: Sequelize.INTEGER
  }

});

module.exports = Review
