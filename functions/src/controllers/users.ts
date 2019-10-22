import { Request, Response, NextFunction } from 'express'
import Jwt from '../helpers/jwt'

const User = {
  /**
   *
   * @param { req } Request
   * @param { res } Response
   * @param { next } NextFunction
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
