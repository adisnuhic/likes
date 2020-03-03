import { Router } from 'express'
import authService from '../services/authService'
import responseHelper from '../helpers/responseHelper'
import { validationResult } from 'express-validator'
import { validators as v } from '../helpers/validators'
import CONSTANTS from '../helpers/constants'


export default () => {
    const api = Router()
    
    /**
     * Signup user
     */
    api.post('/signup',v.signup ,async (req, res, next) => {
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            return responseHelper.invalid(res, errors)
        }
        
        try{
            const userResult = await authService.registerUser({ user: req.body })
            if (userResult){
                return responseHelper.ok(res, CONSTANTS.registration.SUCCESSFULLY_REGISTERED)
            }
            return responseHelper.badRequestCustom(res, {status:400, message:CONSTANTS.registration.USER_ALREADY_EXISTS})
        }catch(err){
            next(err)
        }
        
    })

    /**
     * Login user
     */
    api.post('/login', v.login, async(req, res, next) =>{
        const errors = validationResult(req);
        
        if (!errors.isEmpty()){
            return responseHelper.invalid(res, errors)
        }
        
        try{
            const token = await authService.loginUser({ user: req.body })
            if (token !== null){
                return responseHelper.ok(res, { token:token, message:CONSTANTS.login.LOGIN_SUCCESS })
            }

            return responseHelper.notFound(res)
        }catch(err){
            next(err)
        }
        
    })

    return api

}