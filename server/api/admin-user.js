const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router;

router.get('/products', (req, res, next) => {
  Product.findAll()
    .then(products => res.json(products))
    .catch(err => console.log('Error retrieving products, ', err))

})

router.post('/products', (req, res, next) => {
  Product.create(req.body)
    .then( product => res.json(product))
    .catch(err => console.log( 'Error adding product, ', err))
})

router.put('/products/:id', (req, res, next) => {
  Product.update(req.body, {where: {id: req.params.id}})
    .then(() => {
       return Product.findById(req.params.id)
    })
    .then( product => res.json(product))
})

router.delete('/products/:id', (req, res, next) => {
  Product.destroy({where: {id: req.params.id}})
  .then( () => res.sendStatus(200))
})

