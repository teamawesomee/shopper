const Sequelize = require('sequelize');
const db = require('../db');


const Guest = db.define('guest', {
  guestSessionId: {
    type: Sequelize.STRING,
    unique: true
  }
})

module.exports = Guest;
