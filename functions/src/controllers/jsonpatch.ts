import jsonpatch from 'jsonpatch'

/**
 *
 * @typedef {Object} villainProfile
 * @property {string} villain_name  - Name of the villain.
 * @property {string} real_name - villain's real name.
 * @property {string} quirk - villain's quirk.
 * @description - The objects contains the properties of a
 *                villain in which a patch is going to be applied on.
 */

const villainProfile = {
  "villain_name": "stain",
  "real_name": "Chizome Akaguro",
  "quirk": "Blood Cuddle",
}

const patcher = {

/**
 * @api {patch} /profiles/add Adds a property to the Villain Profile
 * @apiSuccess {Object} profiles Villain Profile
 * @apiSuccess {String} profiles.villain_name Villain Name
 * @apiSuccess {String} profiles.real_name Villain Real-name
 * @apiSuccess {String} profiles.quirk Villain Quirk
 * @apiSuccess {String} profiles.nick_name Villain Nick-name
 * @apiGroup Patcher
 * @apiHeader {String} Authorization='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhZG1pbm1hbiQiLCJzdWIiOiJvbGEiLCJpYXQiOjE1NzE3NDU4NDYsImV4cCI6MTU3MTc0Njg0Nn0.Fjd7COvqJxeYnfo_AfR3gkchhBOA2wcvkzEOJ5v0mNo'
 * @apiParamExample {json} Input
 *    {
 *      "patch": {
 *        "op": "add",
 *        "path": "/nick_name",
 *        "value": "Hero Killer"
 *      }
 *    }
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "message": "Patch was successful",
 *      "data": {
 *        "villian_name": "stain",
 *        "real_name": "Chizome Akaguro",
 *        "quirk": "Blood Cuddle",
 *        "nick_name": "Hero Killer",
 *      }
 *    }
 * @apiErrorExample {json} Authentication Error
 *    HTTP/1.1 401 Unauthorized
 *    {
 *      "error": "Unauthorized User",
 *      "message": "You need to be logged in to perform this action"
 *    }
 * @typedef {Object} patcher
 * @property {function}  add  - function
 * @param { Request } req
 * @param { Response } res
 * @param { NextFunction } next
 */

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
