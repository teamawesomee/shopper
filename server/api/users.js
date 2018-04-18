const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

function throwError(status, msg) {
  const errr = new Error(msg)
  errr.status = status
  throw errr;
}

function isLoggedIn (req, res, next) {
  if (!req.user) throwError(401, 'Unauthorized') // throwError is a function you make that throws an error with the status given. -- KHJJ
  next()
}
router.use('/admin', require('./admin-user'))
router.get('/', isLoggedIn, (req, res, next) => { // only admin should be able to see all users -- KHJJ
  if (!req.user.isAdmin) throwError(403, 'Forbidden') // pull these out into functions like `isLoggedIn` and `isAdmin`. Maybe put them in utils file to use in other files -- kHJJ
  next()
}, (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email']
  })
    .then(users => res.json(users))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => console.log('Failed to retrieve user page, ', err)) // we always have to send a response. Use error handling middleware as done above -- KHJJ
})

