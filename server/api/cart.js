const router = require('express').Router();
const { User, Cart, Order, Product, GuestCart, Guest } = require('../db/models');
const { isLoggedIn } = require('../../utils');
module.exports = router;

              /* ////////// */
              /* GET CART */
              /* ///////// */

router.get('/', (req, res, next) => {
  let userId = req.session.passport.user;
  Cart.findAll({where: { userId }})
  .then((cart) => {
    let idCart = cart.map((product) => product.id)
    res.json(idCart)
  })
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
            .then(() => {
              Cart.findAll({ where: { userId } }).then(cart => {
                let idCart = cart.map((product) => product.id)
                res.json(idCart);
              });
            });
        } else {
          User.findById(userId).then(user => {
            user.addProduct(productId)
            .then(() => {
              Cart.findAll({ where: { userId } }).then(cart => {
                let idCart = cart.map((product) => product.id)
                res.json(idCart);
              });
            });
          });
        }
      })
      .catch(next);
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
