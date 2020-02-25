'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CustomersSchema extends Schema {
  up () {
    this.create('customers', (table) => {
      table.increments()
      table.string('name')
      table.date('register_date')
      table.integer('age')
      table.string('phone', 20)
      table.timestamp('createdAt')
      table.timestamp('updatedAt')
    })
  }

  down () {
    this.drop('customers')
  }
}

module.exports = CustomersSchema
