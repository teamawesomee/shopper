const router = require('express').Router()
const {User, Order, Product} = require('../db/models')
const isLoggedIn = require('../../utils').isLoggedIn;
const isAdmin = require('../../utils').isAdmin;
module.exports = router


router.get('/', isLoggedIn, isAdmin, (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email']
  })
    .then(users => res.json(users))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(next)
})

router.get('/:id/orders', (req, res, next) => {
  Order.getOrdersByUser(req.params.id)
    .then(orders => res.json(orders))
    .catch(next)
})

router.get('/:id/:orderId', (req, res, next) => {
  Order.findById(req.params.orderId, {
    include: {
      model: Product
    }
  })
  .then(order => res.json(order))
  .catch(next);
})

  router.put('/:id', isLoggedIn, isAdmin, (req, res, next) => {
  User.update(req.body, {where: {id: req.params.id}})
    .then(user => res.json(user))
    .catch(next)
})

router.delete('/:id', isLoggedIn, isAdmin, (req, res, next) => {
  User.destroy( {where: {id: req.params.id}})
  .then( () => res.sendStatus(204))
  .catch(next)
})
