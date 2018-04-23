const Sequelize = require('sequelize');
const db = require('../db');
const { Product, User } = require('./index');


const Order = db.define('order', {
  address: {
    type: Sequelize.STRING,
    // validate: {
    //   isAlphanumeric: true
    // }
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true
    }
  },
  phone: {
    type: Sequelize.STRING,
    validate: {
      isNumeric: true
    }
  },
  orderStatus: {
    type: Sequelize.ENUM('Pending', 'In Transit', 'Completed'),
    defaultValue: 'Pending'
  },
  adminInCharge: {
    type: Sequelize.INTEGER
  }
})

//add new order
Order.addNewOrder = function(submittedOrder) {
  let myOrder = Order.create({
    address: submittedOrder.address,
    email: submittedOrder.email
  });

  //whichever one the order has, will be given a real value
  let userId = submittedOrder.userId
  let guestId = null;

  if (!userId) {
    guestId = submittedOrder.guestId
  }


  let prods = submittedOrder.products; //this will be an array

  //sets the associated user
  if (userId) {
    myOrder.setUser(userId);
    let myUser = myOrder.getUser();
    myUser.deleteCart();
  }
  else {
    myOrder.setGuest(guestId);
    let myGuest = myOrder.getGuest();
    myGuest.deleteCart();
  }
  //sets the associated products in line items
  myOrder.addProducts(prods)

  return myOrder;

}

Order.getOrdersByUser = function(userId) {
  Order.findAll({
    where: {
      userId
    },
    include: [{ model: Product }]
  });
};

Order.getOrdersByGuest = function(guestId) {
  Order.findAll({
    where: {
      guestId
    },
    include: [{ model: Product }]
  });
};

Order.getAllOrders = function() {
  Order.findAll({
    include: [{ model: Product }, { model: User }]
  });
};








//find one order

module.exports = Order
