'use strict'

const Sequelize = require('sequelize')

const sequelize = new Sequelize('postgres://postgres:12345@localhost:5432/riliv-crud')

const Model = Sequelize.Model

class Customer extends Model {}

Customer.init({
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  register_date: {
    type: Sequelize.DATE,
    allowNull: false
  },
  age: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: false
  },
}, {
  sequelize,
  modelName: 'customer'
})
