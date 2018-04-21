const router = require('express').Router();
const {User, Cart} = require('../db/models');
const db = require('../db')
const Order = db.model('order')
const Product = db.model('product');
const SessionCart = db.model('SessionCart')
const SessionDb = require('../db/models').Session
const {isLoggedIn, isMine, isAdmin } = require('../../utils');
module.exports = router;

/* GET CART */

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

            /* //////////// */
          /* ADD ITEM TO CART */
          /* //////////// */

router.post('/', (req, res, next) => {
                /* IF */
  if (req.session.passport && req.session.passport.user) { //THE USER IS LOGGED IN
    let userId = req.session.passport.user;

    User.findById(userId)  //FIND THE USER
              /* THEN */
      .then((user) => {
        if (Cart.findOne({ /* IF */
        where: { //THE USER ALREADY HAS THIS ITEM IN THEIR CART
          userId,
          productId: req.body.product.id
        }
      })) {       /* THEN */
          SessionCart.findOne({ //FIND AND RETURN ME THE PRODUCT IN QUESTION
            where: {
              userId,
              productId: req.body.product.id
            }
          })
          .then(product => {
            product.quantity += req.body.quantity; //THEN UPDATE THE QUANTITY.
            return product; //AND RETURN THE PRODUCT
          })
                /* IF THEY DO NOT */
      } else {
        user.addProduct(req.body) //ADD THE PRODUCT TO THE CART, AND RETURN THE PRODUCT
      }
  })
          /* THEN */
  .then((product) => res.json(product)) //SEND THE PRODUCT THROUGH JSON
  .catch(next) //AND CATCH ALL ERRORS
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
            /* /////////// */
        /* DELETE ITEM FROM CART */
          /* ///////////// */

  router.delete('/', (req, res, next) => {
    if (isLoggedIn) { //if the user is logged in
      Cart.destroy({
        where: {
          userId: req.session.passport.user,
          productId: req.body.product.id
        }
      })
      .then(() => res.status(204).send('Delete successful!'))
      .catch(next)

    }
  })

