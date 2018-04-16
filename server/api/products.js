const router = require("express").Router();
const { Product } = require("../db/models");
module.exports = router;

router.get("/", (req, res, next) => {
  Product.findAll()
    .then(products => res.json(products))
    .catch(next);
});
