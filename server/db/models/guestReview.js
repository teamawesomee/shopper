const Sequelize = require('sequelize');
const db = require('../db');

const GuestReview = db.define('guestreview', {
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
})

module.exports = GuestReview