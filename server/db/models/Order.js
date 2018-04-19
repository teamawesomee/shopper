const Sequelize = require('Sequelize');
const db = require('../db')

const Order = db.define('order', {
  // total: {
  //   type: Sequelize.DECIMAL(10, 2) //eventually will be getter method
  // },
  address: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true
    }
  }
  //then we're going to want to find all items with an order id of ""


})

//add new order
Order.prototype.addNewOrder = function(submittedOrder) {
  let myOrder = Order.create({
    address: submittedOrder.address,
    email: submittedOrder.email
  })
  let userId = submittedOrder.userId;
  let prods = submittedOrder.products; //this will be an array

  //sets the associated user
  myOrder.setUser(userId);

  //sets the associated products in line items
  prods.forEach((productId) => {
    myOrder.addProduct(productId)
  })
  return myOrder;
}







//find one order

module.exports = Order