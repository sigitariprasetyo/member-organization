const Sequelize = require('sequelize')
const db = require('../utils/database')

const Member = db.define('members', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  orgs: {
    type: Sequelize.STRING,
    allowNull: false
  },
  login: {
    type: Sequelize.STRING,
    allowNull: false
  },
  avatar_url: {
    type: Sequelize.STRING,
    allowNull: false
  },
  followers: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  following: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = Member