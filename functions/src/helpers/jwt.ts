import jwt from 'jsonwebtoken'

/**
 *  @param {string} username
 */

export default class Jwt {
  static signUser(username: string) {
    return jwt.sign({
      iss: process.env.ISSUER || 'adminman$',
      sub: username,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 1000,
    }, process.env.JWT_TOKEN_SECRET || 'secretlysecret')
  }
}
