const router = require('express').Router();
const { User, Cart, Order, Product, GuestCart, Guest } = require('../db/models');
const { isLoggedIn } = require('../../utils');
module.exports = router;

              /* ////////// */
              /* GET CART */
              /* ///////// */
//TO-DO: router.use to log in as a guest if there's no user.

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
    Guest.findOrCreate({
      where: {
        guestId: req.session.id
      },
    include: {
      model: Product
    }})
      .then(guest => res.json(guest.products))
      .catch(next)
  }
  //IF we have a user, take the user id and get that cart
  //ELSE take the guest ID and get THAT cart
}) // end of router.get

            /* //////////// */
          /* ADD ITEM TO CART */
          /* //////////// */

router.post('/', (req, res, next) => {
  let num = req.body.productQuantity || 1;
  let productId = req.body.productId;

                /* IF THE USER IS LOGGED IN*/
  if (req.session.passport && req.session.passport.user) {

    //Variables
    const userId = req.session.passport.user;

    User.findById(userId)  //FIND THE USER
              /* THEN */
    .then((user) => {
      Cart.findOne({where: {userId, productId}} )
        .then(item => {
          console.log(item)
                        /* IF THE ITEM IS ALREADY PRESENT*/
          if (item) {
            console.log("my quantity is", item.quantity)
            item = item.update({quantity: item.getDataValue('quantity') + num})
            res.json(item.Cart)
          } //then increase the quantity of the thing by one

                /* IF IT IS NOT ALREADY PRESENT */
          else {
            user.addProduct(productId)
              .then(returned => res.json(returned[0][0].Cart)) //ADD THE PRODUCT TO THE CART, AND RETURN THE PRODUCT
          }
        })
        // .then((cart) => {
        //   productId = cart[0][0].dataValues.productId;
        //   Product.findById(productId)
        //     .then((product) => res.json(product));
        // }) //SEND THE PRODUCT THROUGH JSON
        .catch(next) //AND CATCH ALL ERRORS
    })
  }
            /* ///////////////// */
          /* ELSE IF THE USER IS NOT LOGGED IN */
          /* ////////////////// */

  else {
    Guest.findOrCreate({ //FIND OR CREATE THEM IN OUR GUEST DB
      where: {
        guestId: req.session.id
      }})
          /*THEN*/
      .then((guest) => {
        let guestId = guest[0].id
//TO-DO: findorcreate with quantity of 0
//guest cart could associate with the session id rather than guest
        GuestCart.findOne({where: {guestId, productId}})
          .then(item => {
            if (item) {
              /* IF THE ITEM IS ALREADY IN THE CART */
              item = item.update({quantity: item.getDataValue('quantity') + num}) //then increase the quantity of the thing by one
              res.json(item)
            }

            /* IF THEY DO NOT ALREADY HAVE THE ITEM */
            else {
              item = guest[0].addProduct(+req.body.productId) //add product to cart
              res.json(item) //return product through json
            }
          })
          .catch(next) //AND CATCH ALL ERRORS

      })
  }
})
            /* /////////// */
        /* DELETE ITEM FROM CART */
          /* ///////////// */
//TO-DO: middleware that calls/loads the cart
//TO-DO: middleware that logs you in as a guest if you're not logged in

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
    GuestCart.destroy({
      where: { //go into the guest database
        guestId: req.session.id,
        productId: req.params.productId
      }
    })
    .then(() => res.status(204).send('Delete Successful!'))
    .catch(next)
  }
})

