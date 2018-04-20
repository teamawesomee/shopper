const router = require('express').Router();
const { Order, Product, User } = require('../db/models');
module.exports = router;

router.get('/', (req, res, next) => {
  Order.findAll({
    include: [{ model: Product }, { model: User }]
  })
  //Order.getAllOrders()
  .then(orders => {
    return res.json(orders)
  })
  .catch(next);
});


router.post('/', (req, res, next) => {
  Order.addNewOrder(req.body)
  .then(myOrder => res.json(myOrder))
  .catch(next);
});


router.get(':orderId', (req, res, next) => {
  Order.findById(req.params.orderId, {
    include: [{
      model: Product
    },
    {model: User}]
  })
  .then(order => res.json(order))
  .catch(next);
})
