import { Request, Response, NextFunction } from 'express'
import { uploadImage, downloadImage} from '../helpers/imageUploader'

const Images = {

  /**
   *
   * @param { req } Request
   * @param { res } Response
   * @param { next } NextFunction
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
