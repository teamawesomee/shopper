const User = require('./user')
const Product = require(`./product`)
const Order = require('./order')
const Cart = require('./cart')
const Session = require('./session')
const SessionCart = require('./sessionCart')
const LineItem = require('./lineItem')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */
User.hasMany(Order)
Order.belongsTo(User)
Order.belongsTo(Session)
Session.hasMany(Order)

Product.belongsToMany(User, {through: 'Cart'})
User.belongsToMany(Product, {through: 'Cart'})

Product.belongsToMany(Session, {through: 'SessionCart'})
Session.belongsToMany(Product, {through: 'SessionCart'})

Product.belongsToMany(Order, {through: 'LineItem'})
Order.belongsToMany(Product, {through: 'LineItem'})

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Product,
  Order,
  Session,
  Cart,
  SessionCart,
  LineItem
}
