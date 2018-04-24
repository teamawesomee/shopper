const router = require('express').Router();
const { Order, Product, User, LineItem } = require('../db/models');
const { isMine, isAdmin } = require('../../utils');

module.exports = router;

/* GET ALL ORDERS (FOR ADMIN) */

router.get('/', isAdmin, (req, res, next) => {
  Order.findAll({
    include: [{all:true}]
  })
  //Order.getAllOrders()
  .then(orders => {
    return res.json(orders)
  })
  .catch(next);
});

/* GET ORDERS BY USER */

router.get('/:userId', isMine, (req, res, next) => {
  Order.findAll({
    where: {userId: req.params.userId},
    include: [{ model: Product }, { model: User }]
  })
    //Order.getAllOrders()
    .then(orders => {
      console.log("orders:", orders)
      return res.json(orders);
    })
    .catch(next);
});


/* SUBMIT CART TO ORDER */
router.post('/', (req, res, next) => {
  Order.addNewOrder(req.body)
  .then(myOrder => res.json(myOrder))
  .catch(next);
});

/* GET SINGLE ORDER BY ID */
// router.get(':orderId', (req, res, next) => {
//   Order.findById(req.params.orderId, {
//     include: [{
//       model: Product
//     },
//     {model: User}]
//   })
//   .then(order => res.json(order))
//   .catch(next);
// })


        /* ADMIN UPDATES ORDER STATUS */
router.put('/:orderId/updateStatus', isAdmin, (req, res, next) => {
  Order.findById(req.params.orderId)
    .then(order => {
      order.status = req.body.order.status;
      order.adminInCharge = req.session.passport.user;
      return order;
    })
    .then((order) => res.status('201').json(order).send('Order status has been updated!'))
    .catch(next);
})


      /*  UPDATING ORDER INFO */
router.put('/:orderId/updateInfo', (req, res, next) => {
  let message;
  let myStatus;
  Order.findById(req.params.orderId)
    .then(order => {
      if (order.userId === req.session.passport.user && order.orderStatus === 'pending') {
        order = req.body
        myStatus = 204;
        message = 'Your info has been updated!'
        return order;
      } else if (order.userId === req.session.passport.user && order.orderStatus !== 'pending') {
        myStatus = 400
        message = 'Your order cannot be updated after it\'s been shipped!'
        return message;
      } else if (order.userId !== req.session.passport.user) {
        myStatus = 404
        message = 'You do not have permission to edit this message'
        return message;
      }
    })
    .then(returned => res.status(myStatus).json(returned))
    .catch(next);
})
