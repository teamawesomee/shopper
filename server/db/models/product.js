const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  title: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT
  },
  price: {
    type: Sequelize.FLOAT
  },
  inventoryQuantity: {
    type: Sequelize.INTEGER
  },
  category: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  },
  img: {
    type: Sequelize.STRING,
    defaultValue: 'http://soappotions.com/wp-content/uploads/2017/10/round.jpg'
  }
});

module.exports = Product

