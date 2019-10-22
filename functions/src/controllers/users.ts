import { Request, Response, NextFunction } from 'express'
import Jwt from '../helpers/jwt'

const User = {
/**
 * @api {post} /auth/users Registers a user the user gets a token in return
 * @apiSuccess {Object} user Object with username and token
 * @apiSuccess {String} user.data.username Username
 * @apiSuccess {String} user.data.username Token
 * @apiGroup Patcher
 * @apiParamExample {json} Input
 *    {
 *      "username": "Ola",
 *      "password": "notseceret",
 *    }
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "message": "Login successfully",
 *      "data": {
 *        "username": "Ola",
 *        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhZG1pbm1hbiQiLCJzdWIiOiJvbGEiLCJpYXQiOjE1NzE3NTI3OTEsImV4cCI6MTU3MTc1Mzc5MX0.-C3KyegmJes1cxXW3zvvgTbJVDa4KMqhY2V9vycjqjM",
 *      }
 *    }
 *
 * @apiErrorExample {json} Authentication Error
 *    HTTP/1.1 401 Unauthorized
 *    {
 *      "error": "Unauthorized User",
 *      "message": "You need to be logged in to perform this action"
 *    }
 *
  * @apiErrorExample {json} Authentication Error
 *    HTTP/1.1 400 Bad Request
 *    {
 *      "error": "Bad Request",
 *      "message": "Username is required"
 *    }
 * @typedef {Object} patcher
 * @property {function}  add  - function
 * @param { Request } req
 * @param { Response } res
 * @param { NextFunction } next
 */

  signIn: (req: Request, res: Response, next: NextFunction): any => {
    try {
      const { username, password } = req.body;

      if (!username) {
        return res.status(400).json({
          message: 'Username is required',
          error: 'Bad Request'
        });
      }

      if (!password) {
        return res.status(400).json({
          message: 'Password is required',
          error: 'Bad Request'
        });
      }

      if (username === 'unknown') {
        return res.status(401).json({
          message: `Unauthorized access to user`,
          error: 'Unauthorized'
        });
      }

      const token = Jwt.signUser(username)
      const data = Object.assign({}, { username }, { token })

      return res.json({
        message: 'Login successfully',
        data: data
      })
    } catch (error) {
      next(error)
    }
  }
}

export default User
