const Sequelize = require('sequelize')

const sequelize = new Sequelize(
  process.env.PGDATABASE | "test_db",
  process.env.PGUSER | "postgres",
  process.env.PGPASSWORD | "postgres",
  {
    host: process.env.PGHOST | "localhost",
    dialect: 'postgres',
    logging: false
  }
)

module.exports = sequelize