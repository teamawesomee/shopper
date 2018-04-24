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
                        /* IF THE ITEM IS ALREADY PRESENT*/
          if (item) {
            item.update({quantity: item.getDataValue('quantity') + num})
            .then((updatedItem) => {
              let productId = updatedItem.productId;
              Product.findById(productId).then(product => {
                console.log('product is...', product);
                res.json(product); //return product through json
              });
            })
          } //then increase the quantity of the thing by one

                /* IF IT IS NOT ALREADY PRESENT */
          else {
            user.addProduct(productId)
              .then(returned => {
                let productId = returned[0][0].productId;
                Product.findById(productId).then(product => {
                  console.log("product is...", product)
                  res.json(product); //return product through json
                });
              }) //ADD THE PRODUCT TO THE CART, AND RETURN THE PRODUCT
          }
        })
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
        GuestCart.findOne({ where: { guestId, productId } })
          .then(item => {
            /* IF THE ITEM IS ALREADY PRESENT*/
            if (item) {
              item
                .update({
                  quantity: item.getDataValue('quantity') + num
                })
                .then(updatedItem => {
                  let productId = updatedItem.productId;
                  Product.findById(productId).then(product => {
                    console.log('product is...', product);
                    res.json(product); //return product through json
                  });
                });
            } //then increase the quantity of the thing by one

            /* IF THEY DO NOT ALREADY HAVE THE ITEM */
            else {
              guest[0]
                .addProduct(+req.body.productId) //add product to cart
                .then(cart => {
                  let productId = cart[0][0].productId;
                  Product.findById(productId).then(product => {
                    res.json(product); //return product through json
                  });
                });
            }
          })
          .catch(next); //AND CATCH ALL ERRORS

      })
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
    console.log("guestId is...", req.session.id)
    console.log("productId is...", req.params.productId)
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

