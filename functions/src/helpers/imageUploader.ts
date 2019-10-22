import util from 'util'
import sharp from 'sharp'
import axios from 'axios'
import gc from '../config/cloud-storage'

const bucket = gc.bucket('hacker-bay-store')
const { format } = util

/**
 *
 * @param { File } object file object that will be uploaded
 * @description - This function does the following
 * - It uploads a file to the image bucket on Google Cloud
 * - It accepts an object as an argument with the
 *   "originalname" and "buffer" as keys
 */

export const uploadImage = (file: any) => new Promise((resolve, reject) => {
  const { originalname, buffer } = file

  const blob = bucket.file(originalname.replace(/ /g, "_"))
  const blobStream = blob.createWriteStream({
    resumable: false
  })

  blobStream.on('finish', () => {
    const publicUrl = format(
      `https://storage.googleapis.com/${bucket.name}/${blob.name}`
    )
    resolve(publicUrl)
  })
  .on('error', () => {
    reject(`Unable to upload image, something went wrong`)
  })
  .end(buffer)

})

/**
 *
 * @param { imageUrl } Url Image Url
 * @param { filename } String Image file name
 * @description - This function does the following:
 * - It gets the Image from the public url which was initially generated
 * - It converts the image into buffer
 * - The buffer is then being used to resize the image
 * - It finally returns a new object with "filename" and "buffer"
 */

const getImageFromBucket = async (imageUrl: string, filename: string) => {
  const fileBuff = await axios.get(imageUrl, {responseType: 'arraybuffer'})
  const buffer = await sharp(fileBuff.data).resize(50, 50).toBuffer()
  return Object.assign({}, {originalname: filename}, {buffer})
}

/**
 * @param { string } name Name of the file to be downloaded
 * @description - This function does the following:
 * - It replaces any space within the file name with an underscore "_"
 * - It gets the file from the bucket if it exists
 * - The image name and url is being extracted,
 *    which is then passed as an argument to the "getImageFromBucket" function
 * - The function returns an object which is also
 *    being passed to the "uploadImage" function which returns the resized image url
 */
export const downloadImage = async (imgName: string) => {
  const cleanName = imgName.replace(' ', '_')
  const myFile = bucket.file(cleanName)
  const files = await myFile.get()
  const { mediaLink,  name } = files[0].metadata
  const newImageObj = await getImageFromBucket(mediaLink, `resize_${name}`)
  const newImage = await uploadImage(newImageObj)
  return newImage
}
