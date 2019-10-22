import { Request, Response, NextFunction } from 'express'
import { uploadImage, downloadImage} from '../helpers/imageUploader'

const Images = {

/**
 *
 * @param { req } Request
 * @param { res } Response
 * @param { next } NextFunction
 * 
 * @apiDescription - Uploads Images to Google cloud functions
 * @api {post} /uploads Uploads an Image
 * @apiSuccess {Object} Image Object image
 * @apiSuccess {String} image.message Success upload message
 * @apiSuccess {String} image.data Image url link
 * @apiGroup Patcher
 * @apiHeader {String}Authorization='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhZG1pbm1hbiQiLCJzdWIiOiJvbGEiLCJpYXQiOjE1NzE3NDU4NDYsImV4cCI6MTU3MTc0Njg0Nn0.Fjd7COvqJxeYnfo_AfR3gkchhBOA2wcvkzEOJ5v0mNo'
 * @apiSuccessExample {json} Success
 *  HTTP/1.1 200 OK
 *  {
 *    "message": "Upload was successful",
 *    "data": "https://storage.googleapis.com/hacker-bay-store/mineta.jpg"
 *  }
 *
 * @apiErrorExample {json} Authentication Error
 *    HTTP/1.1 401 Unauthorized
 *    {
 *      "error": "Unauthorized User",
 *      "message": "You need to be logged in to perform    this action"
 *    }
 */

  uploadFile: async (req: Request, res: Response, next: NextFunction) => {
    try {

      const myfile: Express.Multer.File = req.file || req.body
      const imageUrl = await uploadImage(myfile)

      res
        .status(200)
        .json({
          message: "Upload was successful",
          data: imageUrl
        })
    } catch (error) {
      next(error)
    }
  },

  /**
   *
   * @param { req } Request
   * @param { res } Response
   * @param { next } NextFunction
   * @description
   * - The endpoint sends a url link in which the user can use for downloading the image
   */
  downloadImage: async (req: any, res: any, next:any ) => {
    try {
      const { filename } = req.body
      const imageUrl = await downloadImage(filename)

      res
        .status(200)
        .json({
          message: "Download was successful",
          data: imageUrl
        })
    } catch (error) {
      next(error)
    }
  }
}

export default Images
