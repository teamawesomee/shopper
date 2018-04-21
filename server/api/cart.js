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
      .then(guest => res.json(guest.products))
      .catch(next)
  }
  //IF we have a user, take the user id and get that cart
  //ELSE take the session ID and get THAT cart
}) // end of router.get

router.post('/', (req, res, next) => {
                /* IF */
  if (req.session.passport && req.session.passport.user) { //THE USER IS LOGGED IN
    let userId = req.session.passport.user;

    User.findById(userId)  //FIND THE USER
              /* THEN */
    .then((user) => user.addProduct(req.body.product)) //ADD THE PRODUCT TO THE USER
    .then((product) => res.json(product)) //AND RETURN IT AS JSON
    .catch(next)
  }
          /* ELSE IF */
  else {   //THE USER IS NOT LOGGED IN
    SessionDb.findOrCreate({ //FIND OR CREATE THEM IN OUR SESSION DB
      where: {
        sessionId: req.session.id
      }})
          /*THEN*/
      .then(guest => {
                    /* IF */
        if (SessionCart.findOne({
          where: { //THE GUEST USER ALREADY HAS THIS ITEM IN THEIR CART
            sessionId: req.session.id,
            productId: req.body.product.id
          }
        })) {       /* THEN */
            SessionCart.findOne({ //FIND AND RETURN ME THE PRODUCT IN QUESTION
              where: {
                sessionId: req.session.id,
                productId: req.body.product.id
              }
            })
            .then(product => {
              product.quantity += req.body.quantity; //THEN UPDATE THE QUANTITY.
              return product; //AND RETURN THE PRODUCT
            })
                  /* IF THEY DO NOT */
        } else {
          guest.addProduct(req.body) //ADD THE PRODUCT TO THE CART, AND RETURN THE PRODUCT
        }
      })
              /* THEN */
      .then((product) => res.json(product)) //SEND THE PRODUCT THROUGH JSON
      .catch(next) //AND CATCH ALL ERRORS
  }
  })

