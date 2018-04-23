const Sequelize = require('sequelize');
const db = require('../db')

const Cart = db.define('Cart', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    validate: {
      min: 1
    }
  }

});


module.exports = Cart
