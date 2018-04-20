const Sequelize = require('sequelize');
const db = require('../db');


const Session = db.define('session', {
  sessionId: {
    type: Sequelize.STRING,
    validate: {
      isUnique: true
    }
  }
})

module.exports = Session;
