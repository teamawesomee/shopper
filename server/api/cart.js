const router = require('express').Router();
const { User, Cart, Order, Product, GuestCart, Guest } = require('../db/models');
const { isLoggedIn } = require('../../utils');
module.exports = router;

              /* ////////// */
              /* GET CART */
              /* ///////// */

router.get('/', (req, res, next) => {
  if (req.session.passport && req.session.passport.user) {
    let userId = req.session.passport.user;
    Cart.findAll({where: { userId }})
    .then((cart) => {
      res.json(cart)
    })
  }
  else {
    let guestSessionId = req.session.id
    Guest.findOrCreate({
      where: { guestSessionId },
    })
    .then((guest) => {
      let guestId = guest.guestSessionId
      GuestCart.findAll({where: { guestId }})
    })
    .then((cart) => {
      res.json(cart)
    })
      .catch(next)
  }
})
            /* //////////// */
          /* ADD ITEM TO CART */
          /* //////////// */

router.post('/', (req, res, next) => {
  let num = req.body.productQuantity || 1;
  let productId = +req.body.productId;
                /* IF THE USER IS LOGGED IN*/
  if (req.session.passport && req.session.passport.user) {
    const userId = req.session.passport.user;
    Cart.findOne({ where: { userId, productId } })
      .then(item => {
        /* IF THE ITEM IS ALREADY PRESENT*/
        if (item) {
          item
            .update({ quantity: item.getDataValue('quantity') + num })
            .then(updatedItem => {
              res.json(updatedItem);
            });
        } else {
          User.findById(userId).then(user => {
            user.addProduct(productId).then(returned => {
              res.json(returned);
            });
          });
        }
      })
      .catch(next);
  } else {
  /* ///////////////// */
  /* ELSE IF THE USER IS NOT LOGGED IN */
  /* ////////////////// */
    Guest.findOrCreate({ //FIND OR CREATE THEM IN OUR GUEST DB
      where: { guestSessionId: req.session.id } })
      /*THEN*/
      .then(guest => {
        let guestId = guest[0].id;
        GuestCart.findOne({ where: { guestId, productId } })
          .then(item => {
          /* IF THE ITEM IS ALREADY PRESENT*/
            if (item) {
              item
                .update({ quantity: item.getDataValue('quantity') + num })
                .then(() => {
                  GuestCart.findAll({ where: guestId})
                  .then((cart) => res.json(cart))
                });
            } //then increase the quantity of the thing by one
          /* IF THEY DO NOT ALREADY HAVE THE ITEM */
            else {
              guest[0]
                .addProduct(+req.body.productId) //add product to cart
                .then(() => {
                  GuestCart.findAll({ where: guestId })
                  //THIS DOESN'T WORK BECAUSE GUEST ID CHANGES EVERY TIME
                  .then((cart) => {
                    res.json(cart)
                  })
                });
            }
        })
      })
      .catch(next); //AND CATCH ALL ERRORS
  }
})
            /* /////////// */
        /* DELETE ITEM FROM CART */
          /* ///////////// */

router.delete('/:productId', (req, res, next) => {
  if (req.session.passport && req.session.passport.user) { //if the user is logged in
    Cart.destroy({
      where: { //go into the user cart database3
        userId: req.session.passport.user,
        productId: req.params.productId
      }
    })
    .then(() => res.status(204).send('Delete successful!'))
    .catch(next)

  } else { //if they are a guest user
    let myGuest = Guest.findOne({where: {guestSessionId: req.session.id}})
    GuestCart.destroy({
      where: { //go into the guest database
        guestId: myGuest.id,
        productId: req.params.productId
      }
    })
    .then(() => res.status(204).send('Delete Successful!'))
    .catch(next)
  }
})
