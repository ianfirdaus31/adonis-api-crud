'use strict'

const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres://postgres:12345@localhost:5432/riliv-crud');

const Model = Sequelize.Model

class Order extends Model {}

Order.init({
  customer_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  order_date: {
    type: Sequelize.DATE,
    allowNull: false
  },
  total_price: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'order'
})

export default Order
