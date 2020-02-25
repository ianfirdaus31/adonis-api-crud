'use strict'

const Encryption = use('Encryption')
const Env = use('Env')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class AccessTokenController {

  async generate({ request, response, view }) {
    response.json({
      data: {
        access_token: Encryption.encrypt(Env.get('APP_KEY'))
      }
    })
  }

}

module.exports = AccessTokenController
