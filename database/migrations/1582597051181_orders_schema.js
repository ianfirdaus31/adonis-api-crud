'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrdersSchema extends Schema {
  up () {
    this.create('orders', (table) => {
      table.increments()
      table.integer('customer_id')
      table.date('order_date')
      table.integer('total_price')
      table.timestamp('createdAt')
      table.timestamp('updatedAt')
    })
  }

  down () {
    this.drop('orders')
  }
}

module.exports = OrdersSchema
