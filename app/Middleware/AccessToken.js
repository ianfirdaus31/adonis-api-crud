'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Encryption = use('Encryption')
const Env = use('Env')

class AccessToken {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request , response }, next) {
    // call next to advance the request
    console.log(request.header('Authorization'))
    console.log(Env.get('APP_KEY'))
    if (Encryption.decrypt(request.header('Authorization').replace('Bearer ', '')) === Env.get('APP_KEY')) {
      await next()
    } else {
      response.unauthorized('Unauthorized Request');
    }
  }
}

module.exports = AccessToken
