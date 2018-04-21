const Sequelize = require('Sequelize');
const db = require('../db');


const Session = db.define('session', {
  sessionId: {
    type: Sequelize.STRING,
    unique: true
  }
})

module.exports = Session;
