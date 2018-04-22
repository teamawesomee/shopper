const Sequelize = require('sequelize');
const db = require('../db');

const LineItem = db.define('LineItem', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    validate: {
      min: 1
    }
  }


})

module.exports = LineItem
