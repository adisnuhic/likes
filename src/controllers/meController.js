import { Router, response } from 'express'
import authService from '../services/authService'
import userService from '../services/userService'
import responseHelper from '../helpers/responseHelper'
import auth from '../middlewares/authMiddleware'
import { validators as v } from '../helpers/validators'
import { validationResult } from 'express-validator'

export default () => {
    const api = Router()

    /**
     * Get loggedIn user info
     */
    api.get("/", auth, async (req, res, next) => {
        try{
            const user = await userService.getByID({id: req.user.id})
            
            if(user != null){
                return responseHelper.ok(res, user)
            }
            return responseHelper.notFound(res)
        }catch(err){
            next(err)
        }
        
    })

    /**
     * Update user password
     */
    api.post("/update-password", v.updatePassword, auth, async (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return responseHelper.invalid(res, errors)
        }
        const { current_password, new_password} = req.body

        try{
           const updated = await userService.updatePassword({ id: req.user.id, current_password: current_password, new_password: new_password })
           
           if(updated !== null){
               return responseHelper.ok(res)
           }

           return responseHelper.badRequest(res)
        }catch(err){
            next(err)
        }
 
    })

    return api
}