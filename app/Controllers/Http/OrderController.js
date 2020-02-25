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

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with orders
 */
class OrderController {
  /**
   * Show a list of all orders.
   * GET orders
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    let orders = await Order.findAll({
      attributes: ['id', 'customer_id', 'order_date', 'total_price']
    })

    response.json({ data: orders })
  }

  /**
   * Create/save a new order.
   * POST orders
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    let order = await Order.create(request.only(['id', 'customer_id', 'order_date', 'total_price']));

    response.json({
      data: order,
      message: 'Order has been saved successfully'
    })
  }

  /**
   * Display a single order.
   * GET orders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Update order details.
   * PUT or PATCH orders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    await Order.update(request.all(), {
      where: {
        id: params.id
      }
    })

    let order = await Order.findAll({
      attributes: ['id', 'customer_id', 'order_date', 'total_price'],
      where: {
        id: params.id
      }
    })

    response.json({
      data: order,
      message: 'Order data has been updated successfully'
    })
  }

  /**
   * Delete a order with id.
   * DELETE orders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    Order.destroy({
      where: {
        id: params.id
      }
    })

    response.json({
      message: 'Order has been deleted successfully'
    })
  }
}

module.exports = OrderController
