const router = require('express').Router();
const {User, Cart} = require('../db/models');
const db = require('../db')
const Order = db.model('order')
const Product = db.model('product');
const SessionCart = db.model('SessionCart')
const SessionDb = require('../db/models').Session
const {isLoggedIn, isMine, isAdmin } = require('../../utils');
module.exports = router;

router.get('/', (req, res, next) => {
  console.log(req.session.id)
  if (req.session.passport && req.session.passport.user) {
    let userId = req.session.passport.user;
    console.log(userId)
    User.findById(userId, {
      include: {
        model: Product
      }
    })
    .then((cart) => res.json(cart.products))
    .catch(next)
  } //
  else {
    SessionDb.findOrCreate({
      where: {
        sessionId: req.session.id
      },
    include: {
      model: Product
    }})
      .then(guest => res.json(guest))
      .catch(next)
  }
  //IF we have a user, take the user id and get that cart
  //ELSE take the session ID and get THAT cart
}) // end of router.get

router.post('/', (req, res, next) => {
  if (req.session.passport && req.session.passport.user) {
    let userId = req.session.passport.user;
    console.log(userId)
    User.findById(userId)
    .then((user) => user.addProduct(req.body))
    .then(() => res.json("Your product has been added!"))
    .catch(next)
  }
  else {
    SessionDb.findOrCreate({
      where: {
        sessionId: req.session.id
      }})
      .then(guest => guest.addProduct(req.body))
      .then(() => res.json("Your product has been added!"))
      .catch(next)
  }
  })

