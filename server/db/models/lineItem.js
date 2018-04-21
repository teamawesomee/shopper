const Sequelize = require('Sequelize');
const db = require('../db');

const LineItem = db.define('LineItem', {
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    }
  }


})

module.exports = LineItem
