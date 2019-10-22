import * as functions from 'firebase-functions'
import firebase from 'firebase-admin'
import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
import multer from 'multer'

import logger from '../config/Logger'
import router from '../routes/'

firebase.initializeApp()
const app: express.Application = express()

const multerMid = multer({
  storage: multer.memoryStorage(),
  limits: {
    // no larger than 5mb.
    fileSize: 5 * 1024 * 1024,
  },
});

app.disable('x-powered-by')
app.use(helmet())
app.use(multerMid.single('file'))
app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(router)

/**
 * @api {get} / Welcomes you with a welcome message
 * @param { Request } req
 * @param { Response } res
 * @param { NextFunction } next
 * @apiSuccess {json} welcome Welcome message
 * @apiGroup Patcher
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "message": 'hi',
 *    }
 */

app.get('/', (req: any, res: any, next: any) => {
  res
    .status(200)
    .json({
      message: 'hi',
    })
})

app.use((err: any, req: any, res: any, next: any) => {
  logger.info(err)
  res.status(err.code || 500 ).json({
    error: err.errors ? err.errors[0].reason : err.error,
    message: err.message || 'Internal server error!',
  })
  next()
})

export default app
export const api = functions.https.onRequest(app)
