const router = require('express').Router();
const { Review, Product, User } = require('../db/models');

module.exports = router;

/* GET ALL REVIEWS */

router.get('/', (req, res, next) => {
  Review.findAll({
    include: [{ model: Product }, { model: User }] //we're not including guests I guess
  })
  .then(reviews => {
    return res.status(200).json(reviews)
  })
  .catch(next);
});

/* GET REVIEW BY USER */

router.get('/:userId', (req, res, next) => {
  Review.findAll({
    where: {userId: req.params.userId},
    include: [{ model: Product }, { model: User }]
  })
    .then(reviews => {
      return res.status(200).json(reviews);
    })
    .catch(next);
});


/* SUBMIT REVIEW */
router.post('/', (req, res, next) => {
  Review.addNewReview(req.body)
  .then(myReview => res.status(200).json(myReview))
  .catch(next);
});

/* GET SINGLE REVIEW BY ID */
router.get(':reviewId', (req, res, next) => {
  Review.findById(req.params.reviewId, {
    include: [{
      model: Product
    },
    {model: User}]
  })
  .then(review => res.status(200).json(review))
  .catch(next);
})

      /*  UPDATE REVIEW */
router.put('/:reviewId/update', (req, res, next) => {
  Review.update(req.body, { where: { reviewId: req.params.reviewId }})
    .then(review => res.status(201).json(review))
    .catch(next);
})

    /* DESTROY REVIEW */
router.delete('/:reviewId/delete', (req, res, next) => {
  Review.destroy({ where: { reviewId: req.params.reviewId }})
  .then(review => res.status(202).json(review))
  .catch(next);
})