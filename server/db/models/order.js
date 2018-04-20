const Sequelize = require('sequelize');
const db = require('../db')
const { Product, User } = require('./index')


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
Order.addNewOrder = function(submittedOrder) {
  let myOrder = Order.create({
    address: submittedOrder.address,
    email: submittedOrder.email
  })
  let userId = submittedOrder.userId;
  let prods = submittedOrder.products; //this will be an array

  //sets the associated user
  myOrder.setUser(userId);
  let myUser = myOrder.getUser();

  myUser.deleteCart();

  //sets the associated products in line items
  myOrder.addProducts(prods)

  return myOrder;

}

Order.prototype.getOrdersByUser = function(userId) {
  Order.findAll({
    where: {
      userId
    },
    include: [{ model: Product }]
  });
};

Order.prototype.getAllOrders = function() {
  Order.findAll({
    include: [{ model: Product }, { model: User }]
  });
};
<<<<<<< HEAD:server/db/models/Order.js







=======
>>>>>>> 5514eb57bea084516f7459c1c399f09cebe76213:server/db/models/order.js

//find one order

module.exports = Order
