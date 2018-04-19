const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  title: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  price: {
    type: Sequelize.DECIMAL(10,2),
    allowNull: false
  },
  inventoryQuantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate:{
      min: 0
    }
  },
  category: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    allowNull: false
  },
  img: {
    type: Sequelize.STRING,
    defaultValue: 'http://soappotions.com/wp-content/uploads/2017/10/round.jpg'
  }
});

module.exports = Product

