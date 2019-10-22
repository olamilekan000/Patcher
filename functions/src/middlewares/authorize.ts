import jwt from 'jsonwebtoken'

export const authorizeUser = (req: any, res: any, next: any): void => {
  try {
    const token = req.get('Authorization')
    if(!token){
      return res.status(401).json({
        error: 'Unauthorized User',
        message: 'You need to be logged in to perform this action'
      })
    }

    const user = jwt.verify(token, process.env.JWT_TOKEN_SECRET || 'secretlysecret')
    if(user) {
      next()
    }
  } catch (error) {
    error.code = 401
    error.message = 'You need to be logged in to perform this action'
    error.error = 'Couldn\'t perform this operation'
    next(error)
  }
}
