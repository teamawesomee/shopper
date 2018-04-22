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

GuestCart.prototype.increaseQuantity = function(num) {
  this.quantity = this.getDataValue('quantity') + num;
}

module.exports = GuestCart
