import { Router } from 'express'
import responseHelper from '../helpers/responseHelper'
import auth from '../middlewares/authMiddleware'
import likeBusiness from '../business/likeBusiness'

export default () => {
    const api = Router()

    /**
     * Like user
     */
    api.post("/:id/like", auth, async(req, res, next)=>{
        const follower_id = req.user.id
        const { id } = req.params

        try{
            const alreadyLiked = await likeBusiness.isLiked({user_id: id, follower_id: follower_id})

            if(alreadyLiked != null){
                return responseHelper.badRequestCustom(res, { status:400, message: "You alredy liked this user!" })
            }
           
            await likeBusiness.like({user_id: id, follower_id: follower_id})
            
            return responseHelper.ok(res)
        }catch(err){
            next(err)
        }
    })

    /**
     * Unlike user
     */
    api.post("/:id/unlike", auth, async(req, res, next)=>{
        const follower_id = req.user.id
        const { id } = req.params

        try{
            const alreadyLiked = await likeBusiness.isLiked({user_id: id, follower_id: follower_id})

            if(alreadyLiked == null){
                return responseHelper.badRequestCustom(res, { status:400, message: "You didn't like that user!" })
            }
           
            await likeBusiness.unlike({like: alreadyLiked})
            
            return responseHelper.ok(res)
        }catch(err){
            next(err)
        }
    })


    /**
     * Most liked users
     */
    api.get("/most-liked", auth, async(req, res, next)=>{
        
        try{
            const users = await likeBusiness.mostLiked()
            return responseHelper.ok(res, users)
        }catch(err){
            next(err)
        }

    })

    return api
}