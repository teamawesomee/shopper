const router = require('express').Router();
const { Review, Product, User } = require('../db/models');

module.exports = router;

/* GET ALL REVIEWS */

router.get('/', (req, res, next) => {
  Review.findAll()
  .then(reviews => {
    return res.status(200).json(reviews)
  })
  .catch(next);
});

/* GET SINGLE REVIEW BY ID */
router.get(':reviewId', (req, res, next) => {
  Review.findById(req.params.reviewId)
  .then(review => res.status(200).json(review))
  .catch(next);
})

/* GET REVIEWS BY USER */

router.get('/user/:userId', (req, res, next) => {
  Review.findAll({
    where: {userId: req.params.userId}
  })
    .then(reviews => {
      return res.status(200).json(reviews);
    })
    .catch(next);
});

/* GET REVIEWS BY PRODUCT */
router.get('/product/:productId', (req, res, next) => {
  Review.findAll({
    where: {productId: req.params.productId}
  })
    .then(reviews => {
      return res.status(200).json(reviews);
    })
    .catch(next);
});


  /* SUBMIT REVIEW */
router.post('/', (req, res, next) => {
  Promise.all(User.findById(req.body.userId, Product.findById(req.body.productId)))
  .then(promised => promised[0].addProduct(promised[1]))
  .then(review => {
    review.rating = req.body.rating
    review.title = req.body.title
    review.message = req.body.message
    return review.save()
  })
  .then(review => res.status(200).json(review))
  .catch(next);
});

      /*  UPDATE REVIEW */
router.put('/:reviewId/update', (req, res, next) => {
  Review.update(req.body, { where: { id: req.params.reviewId }})
    .then(review => res.status(201).json(review))
    .catch(next);
})

    /* DESTROY REVIEW */
router.delete('/:reviewId/delete', (req, res, next) => {
  Review.destroy({ where: { id: req.params.reviewId }})
  .then(review => res.status(202).json(review))
  .catch(next);
})