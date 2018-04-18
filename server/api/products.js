const router = require('express').Router();
const { Product } = require('../db/models');
module.exports = router;

router.get('/', (req, res, next) => {
  Product.findAll()
    .then(products => {
      console.log('IN THE BACKEND FOR PRODUCTS!')
      return res.json(products)} ) // remove logs in master and make 1 line -- KHJJ
    .catch(next);
});

router.post('/', (req, res, next) => { // isLoggedIn, isAdmin -- KHJJ
  Product.create(req.body)
    .then(product => res.json(product)) // 201 status -- KHJJ
    .catch(next);
});

router.get('/:productId', (req, res, next) => {
  Product.findById(req.params.productId)
    .then(product => res.json(product))
    .catch(next)
});

router.put('/:productId', (req, res, next) => {
  Product.findById(req.params.productId) // suggest if you feel like it look at router.param to dry up this code :D -- KHJJ
    .then(product => product.update(req.body))
    .then(product => res.json(product))
    .catch(next);
});

router.delete('/:productId', (req, res, next) => {
  Product.findById(req.params.productId)
    .then(product => product.destroy(req.body))
    .then(() => res.status(202).json('deleted!')) // 204 status; no body so no json will be added so don't put it here. sendStatus -- KHJJ
    .catch(next);
});



