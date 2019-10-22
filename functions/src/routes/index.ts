import * as express from 'express'

import Images from '../controllers/images'
import Users from '../controllers/users'
import patcher from '../controllers/jsonpatch'
import { authorizeUser } from '../middlewares/authorize'

const { Router } = express

const router = Router()

router.route('/uploads')
  .post(authorizeUser, Images.uploadFile)

router.route('/downloads')
  .post(authorizeUser, Images.downloadImage)

router.route('/auth/users')
  .post(Users.signIn)

router.route('/profiles/add')
  .patch(authorizeUser, patcher.add)

export default router
