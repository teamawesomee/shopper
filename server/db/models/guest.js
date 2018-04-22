const Sequelize = require('sequelize');
const db = require('../db');


const Guest = db.define('guest', {
  guestId: {
    type: Sequelize.STRING,
    unique: true
  }
})

module.exports = Guest;
