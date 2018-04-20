//Utility Functions

const throwError = function (status, msg){
  const err = new Error(msg)
  err.status = status
  throw err;
}

const utilFuncs = {
  isLoggedIn: function (req, res, next) {
    if (!req.user) throwError(401, 'Unauthorized')
    next()
  },
  isAdmin: function (req, res, next){
    if (!req.user.isAdmin) throwError(403, 'Forbidden')
    next()
  },
  isMine: function (req, res, next) {
    if (req.user.id !== req.params.userId && !utilFuncs.isAdmin) {throwError(403, 'Forbidden')
    .next()
  }
  }
}

module.exports = utilFuncs
