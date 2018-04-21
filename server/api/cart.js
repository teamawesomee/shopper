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
    // if a session exists in the Session database with the same session id as our session's ID, we just get the products associated with the session
    // if (SessionDb.CreateOrFind(req.session) findOne({where: {sessionId: req.session.id}})) {
    //   let sessionId = req.session.id
    //   console.log("I exist in the database!", "my session id is", sessionId)
    //   SessionDb.findOne({
    //     where: {
    //       sessionId
    //     },
    //     include: {
    //       model: Product
    //     }
    //   })
    //     .then((cart) => {
    //       if (cart != null) {
    //         res.json(cart)
    //       } else {
    //         res.json("There are no products to display!")
    //       }
    //     })
    //     .catch(next);
    // } else {
    //   //if a session does not exist in the session database with the same session ID as our session's ID, we create the instance first and then add the product
    //   SessionDb.create({sessionId: req.session.id})
    //     .then(res.json('There are no products to display!'))
    //     .catch(next)
    // }

  }
  //IF we have a user, take the user id and get that cart
  //ELSE take the session ID and get THAT cart
})
