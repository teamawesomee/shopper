const router = require('express').Router();
const { Product } = require('../db/models');
const isLoggedIn = require('../../utils').isLoggedIn;
const isAdmin = require('../../utils').isAdmin;
module.exports = router;


router.get('/', (req, res, next) => {
  Product.findAll()
    .then(products => {
      return res.json(products)} )
    .catch(next);
});

router.post('/', isLoggedIn, isAdmin, (req, res, next) => {
  if (req.body.img.trim() === ''){
    delete req.body.img
  }
  Product.create(req.body)
    .then(product => res.json(product))
    .catch(next);
});

router.get('/:productId', (req, res, next) => {
  Product.findById(req.params.productId)
    .then(product => res.json(product))
    .catch(next)
});

router.put('/:productId', isLoggedIn, isAdmin, (req, res, next) => {
  Product.findById(req.params.productId)
    .then(product => product.update(req.body))
    .then(product => res.json(product))
    .catch(next);
});

router.delete('/:productId', isLoggedIn, isAdmin, (req, res, next) => {
  Product.findById(req.params.productId)
    .then(product => product.destroy(req.body))
    .then(() => res.sendStatus(204))
    .catch(next);
});

