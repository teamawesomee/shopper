const router = require('express').Router();
const { Order, Product, User, Cart, SessionCart } = require('../db/models');
const SessionDb = require('../db/models').Session
const {isLoggedIn, isMine, isAdmin } = require('../../utils');
module.exports = router;

router.get('/', (req, res, next) => {
  console.log(req.session)
  if (req.session.passport.user) {
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
    // if a session exists in the Session database with the same session id as our session's ID, we just get the products associated with the session
    if (SessionDb.findOne({where: {sessionId: req.session.id}})) {
      let sessionId = req.session.id
      console.log(sessionId)
      SessionDb.findOne({
        where: {
          sessionId
        },
        include: {
          model: Product
        }
      })
        .then((cart) => res.json(req.session))
        .catch(next);
    } else {
      //if a session does not exist in the session database with the same session ID as our session's ID, we create the instance first and then add the product
      SessionDb.create({sessionId: req.session.id})
        .then(mySession => mySession.getProducts())
        .then((cart) => console.log("my cart is", cart))
        .catch(next)
    }

  }
  //IF we have a user, take the user id and get that cart
  //ELSE take the session ID and get THAT cart
})
