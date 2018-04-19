//Utility Functions

const utilFuncs = {
  throwError: function (status, msg){
    const err = new Error(msg)
    err.status = status
    throw err;
  },
  isLoggedIn: function (req, res, next) {
    if (!req.user) throwError(401, 'Unauthorized')
    next()
  }
}

module.exports = utilFuncs
