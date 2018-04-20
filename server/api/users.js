const router = require('express').Router()
const {User, Order, Product} = require('../db/models')
const { isLoggedIn, isAdmin, isMine} = require('../../utils')
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

//cart functionality
router.get('/:userId/cart', isMine || isAdmin, (req, res, next) => {
  User.getProducts({
    where: {
      userId: req.params.userId
    }
  })
  .then((cart) => res.json(cart))
  .catch(next)
})

router.post('/:userId/cart/', isMine || isAdmin, (req, res, next) => {
  User.findById(req.params.userId).addProduct(req.body)
  .then(() => res.sendStatus(201))
  .catch(next)
})

router.delete('/:userId/cart/', isMine || isAdmin, (req, res, next) => {
  User.findById(req.params.userId).deleteProduct(req.body)
  .then(() => res.sendStatus(204))
  .catch(next)
})
