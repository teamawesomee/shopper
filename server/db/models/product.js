const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  title: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false // this allows an empty string -- KHJJ
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  price: {
    type: Sequelize.FLOAT, // DECIMAL(10,2) -- KHJJ
    allowNull: false
  },
  inventoryQuantity: {
    type: Sequelize.INTEGER,
    allowNull: false // defaultValue  and a min 0 -- KHJJ
  },
  category: { // I would advice this is a schema -- KHJJ
    // redundancy, higher chance for corruption, non-normalized, using an array with not a good use case in SQL -- KHJJ
        // many to many relationship is what I would expect here -- KHJJ
        // don't do this yet -- KHJJ
    type: Sequelize.ARRAY(Sequelize.STRING),
    allowNull: false
  },
  img: {
    type: Sequelize.STRING,
    defaultValue: 'http://soappotions.com/wp-content/uploads/2017/10/round.jpg'
  }
});

module.exports = Product

