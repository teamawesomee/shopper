const User = require('./user')
const Product = require(`./product`)
const Order = require('./order')
const Cart = require('./cart')
const Guest = require('./guest')
const GuestCart = require('./guestCart')
const LineItem = require('./lineItem')
const Review = require('./review')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */
User.hasMany(Order)
Order.belongsTo(User)
Order.belongsTo(Guest)
Guest.hasMany(Order)

Product.belongsToMany(User, {through: 'Cart'})
User.belongsToMany(Product, {through: 'Cart'})

Product.belongsToMany(Guest, {through: 'GuestCart'})
Guest.belongsToMany(Product, {through: 'GuestCart'})

Product.belongsToMany(Order, {through: 'LineItem'})
Order.belongsToMany(Product, {through: 'LineItem'})

User.belongsToMany(Product, {through: 'review'}) //why are we capital casing the other ones?
Product.belongsToMany(User, {through: 'review'})

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
  Guest,
  Cart,
  GuestCart,
  LineItem,
  Review
}
