import { Router } from 'express'
import authService from '../services/authService'
import responseHelper from '../helpers/responseHelper'
import auth from '../middlewares/authMiddleware'
import likeService from '../services/likeService'


export default () => {
    const api = Router()

    /**
     * Like user
     */
    api.post("/:id/like", auth, async(req, res, next)=>{
        const follower_id = req.user.id
        const { id } = req.params

        try{
            const alreadyLiked = await likeService.isLiked({user_id: id, follower_id: follower_id})

            if(alreadyLiked != null){
                return responseHelper.badRequestCustom(res, { status:400, message: "You alredy liked this user!" })
            }
           
            await likeService.like({user_id: id, follower_id: follower_id})
            
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
            const alreadyLiked = await likeService.isLiked({user_id: id, follower_id: follower_id})

            if(alreadyLiked == null){
                return responseHelper.badRequestCustom(res, { status:400, message: "You didn't like that user!" })
            }
           
            await likeService.unlike({like: alreadyLiked})
            
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
            const users = await likeService.mostLiked()
            return responseHelper.ok(res, users)
        }catch(err){
            next(err)
        }

    })

    return api
}