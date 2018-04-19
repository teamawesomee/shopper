const Sequelize = require('Sequelize');
const db = require('../db')

const Order = db.define('order', {
  total: {
    type: Sequelize.DECIMAL(10, 2)
  },
  address: {
    type: Sequelize.STRING
  },
  //then we're going to want to find all items with an order id of ""

})

module.exports = Order
