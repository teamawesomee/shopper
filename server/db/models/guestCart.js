const Sequelize = require('sequelize');
const db = require('../db');

const GuestCart = db.define('GuestCart', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    validate: {
      min: 1
    }
  }

})


module.exports = GuestCart
