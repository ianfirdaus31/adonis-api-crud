'use strict'

/*
|--------------------------------------------------------------------------
| CustomerSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

Factory.blueprint('customers', () => {
  return {
    name: 'Customer 1',
    register_date: '2020-02-12',
    age: 20,
    phone: '92382392912'
  }
})

class CustomerSeeder {
  async run () {
    await Factory
    .get('customers')
    .table('customers')
    .create()
  }
}

module.exports = CustomerSeeder
