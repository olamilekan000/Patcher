import jsonpatch from 'jsonpatch'

/**
 *
 * @typedef {Object} villainProfile
 * @property {string}  villain_name  - Name of the villain.
 * @property {string}  real_name - villain's real name.
 * @property {string}  quirk - villain's quirk.
 * @description - The objects contains the properties of a
 *                villain in which a patch is going to be applied on.
 */

const villainProfile = {
  "villain_name": "stain",
  "real_name": "Chizome Akaguro",
  "quirk": "Blood Cuddle",
}

/**
 *
 * @typedef {Object} patcher
 * @property {function}  add  - function
 * @param { Request } req
 * @param { Response } res
 * @param { NextFunction } next
 */

const patcher = {
  add: (req: any, res: any, next: any) => {
    try {
      const { patch } = req.body
      if(!patch) {
        return res.status(400).json({
          message: 'Incomplete params'
        });
      }

      if(typeof patch !== 'object') {
        return res.status(400).json({
          message: 'Invalid params'
        });
      }

      const patcheddoc = jsonpatch.apply_patch(villainProfile, [patch])

      return res.status(200).json({
        message: 'Patch was successful',
        data: patcheddoc
      })
    } catch (error) {
      next(error)
    }
  }
}

export default patcher
