const router = require('express').Router();
const { User, Cart, Order, Product, SessionCart, Session } = require('../db/models');
const { isLoggedIn } = require('../../utils');
module.exports = router;

              /* ////////// */
              /* GET CART */
              /* ///////// */

router.get('/', (req, res, next) => {
  console.log(req.session.id)
  if (req.session.passport && req.session.passport.user) {
    let userId = req.session.passport.user;
    User.findById(userId, {
      include: {
        model: Product
      }
    })
    .then((cart) => res.json(cart.products))
    .catch(next)
  } //
  else {
    Session.findOrCreate({
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

                /* IF THE USER IS LOGGED IN*/
  if (req.session.passport && req.session.passport.user) {

    //Variables
    const userId = req.session.passport.user;
    const productId = req.body.productId;
    let alreadyPresent;


    User.findById(userId)  //FIND THE USER
              /* THEN */
    .then((user) => {
      Cart.findOne({where: {userId, productId}})
        .then(item => { //Find out if the item is already present
                        /* IF THE ITEM IS ALREADY PRESENT*/
          if (item.quantity >= 1) {
            const num = 1
            item.quantity += num;
          } //then increase the quantity of the thing by one

                /* IF IT IS NOT ALREADY PRESENT */
          else {
          user.addProduct(productId)
            .then(returned => {console.log("this is what I am getting back", returned)}) //ADD THE PRODUCT TO THE CART, AND RETURN THE PRODUCT
          Product.findById(itemId)
            .then(foundItem => {item = foundItem})
          }
          console.log("my product is", item)

          return item;
        })
        .then(product => res.json(product)) //SEND THE PRODUCT THROUGH JSON
        .catch(next) //AND CATCH ALL ERRORS
    })

  }
            /* ///////////////// */
          /* ELSE IF THE USER IS NOT LOGGED IN */
          /* ////////////////// */

  else {
    Session.findOrCreate({ //FIND OR CREATE THEM IN OUR SESSION DB
      where: {
        sessionId: req.session.id
      }})
          /*THEN*/
      .then((guest) => {
        let sessionId = guest[0].id
        let productId = req.body.productId;
        console.log(productId)
        SessionCart.findOne({where: {sessionId, productId}})
          .then(item => {
            if (item) { //if it is
              const num = 1
                item.quantity += num
            } //then increase the quantity of the thing by one
            /* IF THEY DO NOT ALREADY HAVE THE ITEM */
            else {
              item = guest[0].addProduct(+req.body.productId) //ADD THE PRODUCT TO THE CART, AND RETURN THE PRODUCT
            }
            return item
          })    /* THEN */
          .then((product) => res.json(product)) //SEND THE PRODUCT THROUGH JSON
          .catch(next) //AND CATCH ALL ERRORS

      })

  }
})
            /* /////////// */
        /* DELETE ITEM FROM CART */
          /* ///////////// */

router.delete('/', (req, res, next) => {
  if (isLoggedIn) { //if the user is logged in
    Cart.destroy({
      where: { //go into the user cart database
        userId: req.session.passport.user,
        productId: req.body.product.id
      }
    })
    .then(() => res.status(204).send('Delete successful!'))
    .catch(next)

  } else { //if they are a guest user
    Cart.destroy({
      where: { //go into the guest database
        sessionId: req.session.id,
        productId: req.body.product.id
      }
    })
    .then(() => res.status(204).send('Delete Successful!'))
    .catch(next)
  }
})

