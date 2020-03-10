import likeService from '../services/likeService'
import { Like } from '../models'

class LikeBusiness{

    /**
     * isLiked Business
     * @param user_id, follower_id
     */
    async isLiked({ user_id, follower_id }){
        return await likeService.isLiked({user_id, follower_id})
    }

    /**
     * Like  Business
     * @param user_id, follower_id
     */
    async like({ user_id, follower_id }){
        const newLike = Like.build({'user_id':user_id, 'follower_id':follower_id})
        return await likeService.like({ newLike })
    }

    /**
     * Unlike Business
     * @param like obj
     */
    async unlike({ like }){
        return await likeService.unlike({ like })
    }

    /**
     * Most Liked Business
     */
    async mostLiked(){
        return await likeService.mostLiked()
    }

}

const likeBusiness = new LikeBusiness()
export default likeBusiness