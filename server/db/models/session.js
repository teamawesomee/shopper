const Sequelize = require('sequelize');
const db = require('../db');


const Session = db.define('session', {
  sessionId: {
    type: Sequelize.STRING,
    unique: true
  }
})

module.exports = Session;
