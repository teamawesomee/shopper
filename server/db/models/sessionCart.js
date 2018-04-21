const Sequelize = require('Sequelize');
const db = require('../db');

const SessionCart = db.define('SessionCart', {
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    }
  }

})

SessionCart.prototype.increaseQuantity = function(num) {
  this.quantity = this.getDataValue('quantity') + num;
}

module.exports = SessionCart
