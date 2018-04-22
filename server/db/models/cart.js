const Sequelize = require('Sequelize');
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

Cart.prototype.increaseQuantity = function(num) {
  this.quantity = this.getDataValue('quantity') + num;
}

module.exports = Cart
