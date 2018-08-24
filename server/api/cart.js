const router = require('express').Router();
const { User, Cart } = require('../db/models');
module.exports = router;

              /* ////////// */
              /* GET CART */
              /* ///////// */

router.get('/', (req, res, next) => {
  let userId = req.user.id;
  Cart.findAll({where: { userId }})
  .then((cart) => {
    let idCart = []
    cart.forEach((product) => {
      for (let i = 0; i < product.quantity; i++) {
        idCart.push(product.productId)
      }
    })
    res.json(idCart)
  })
  .catch(next)
})
            /* //////////// */
          /* ADD ITEM TO CART */
          /* //////////// */

router.post('/', (req, res, next) => {
  let num = req.body.productQuantity || 1;
  let productId = +req.body.productId;
  const userId = req.user.id;
    Cart.findOne({ where: { userId, productId } })
    .then(item => {
      /* IF THE ITEM IS ALREADY PRESENT*/
      if (item) {
        item
          .update({ quantity: item.getDataValue('quantity') + num })
          .then(() => {
            Cart.findAll({ where: { userId } }).then(cart => {
              let idCart = []
              cart.forEach((product) => {
                for (let i = 0; i < product.quantity; i++) {
                  idCart.push(product.productId)
                }
              })
              res.json(idCart);
            });
          });
      } else {
        User.findById(userId).then(user => {
          user.addProduct(productId)
          .then(() => {
            Cart.findAll({ where: { userId } }).then(cart => {
              let idCart = []
              cart.forEach((product) => {
                for (let i = 0; i < product.quantity; i++) {
                  idCart.push(product.productId)
                }
              })
              res.json(idCart);
            });
          });
        });
      }
    })
  // }))
    .catch(next);
})


            /* /////////// */
        /* DELETE ITEM FROM CART */
          /* ///////////// */

router.delete('/:productId', async (req, res, next) => {
  try {
    const userId = req.session.passport.user
    const productId = +req.params.productId
    const item = await Cart.findOne({ where: { userId, productId } })
    //updated the quantity
    if (item.quantity === 1) {
      await item.destroy()
    }
    else {
      let quantity = item.quantity - 1
      await item.update({ quantity })
    }
    const cart = await Cart.findAll({ where: { userId } })
    let idCart = []
    cart.forEach((product) => {
      for (let i = 0; i < product.quantity; i++) {
        idCart.push(product.productId)
      }
    })
    res.json(idCart);
  }
  catch (err) {
    next(err)
  }
})
