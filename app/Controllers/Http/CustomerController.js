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
  modelName: 'customers'
})

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with customers
 */
class CustomerController {
  /**
   * Show a list of all customers.
   * GET customers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    let customers = await Customer.findAll({
      attributes: ['id', 'name', 'register_date', 'age', 'phone']
    })

    response.json({ data: customers })
  }

  /**
   * Create/save a new customer.
   * POST customers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    let customer = await Customer.create(request.only(['name', 'register_date', 'age', 'phone']));

    response.json({
      data: customer,
      message: 'Customer has been saved successfully'
    })
  }

  /**
   * Display a single customer.
   * GET customers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Update customer details.
   * PUT or PATCH customers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    await Customer.update(request.all(), {
      where: {
        id: params.id
      }
    })

    let customer = await Customer.findAll({
      attributes: ['id', 'name', 'register_date', 'age', 'phone'],
      where: {
        id: params.id
      }
    })

    response.json({
      data: customer,
      message: 'Customer data has been updated successfully'
    })
  }

  /**
   * Delete a customer with id.
   * DELETE customers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    Customer.destroy({
      where: {
        id: params.id
      }
    })

    response.json({
      message: 'Customer has been deleted successfully'
    })
  }
}

module.exports = CustomerController
