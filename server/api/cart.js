const router = require('express').Router();
const { Order, Product, User, Session } = require('../db/models');
const {isLoggedIn, isMine, isAdmin } = require('../../utils');
module.exports = router;

router.get('/', (req, res, next) => {
  if (isLoggedIn) {
    User.getProducts({
    where: {
      userId: req.session.userId
    }
  })
  .then((cart) => res.json(cart))
  .catch(next)
  }
  else {
    //if a session exists in the Session database with the same session id as our session's ID, we just get the products associated with the session
    if (Session.findOne({where: {sessionId: req.session.id}})) {
      let mySession = Session.findOne({where: {sessionId: req.session.id}})

      mySession.getProducts()
      .then((cart) => res.json(cart))
      .catch(next);
    } else {
      //if a session does not exist in the session database with the same session ID as our session's ID, we create the instance first and then add the product
      Session.create({sessionId: req.session.id})
        .then(mySession => mySession.getProducts())
        .then((cart) => res.json(cart))
        .catch(next)
    }

  }
  //IF we have a user, take the user id adn get that cart
  //ELSE take the session ID and get THAT cart
})
