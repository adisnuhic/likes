import likeRepository from '../repositories/likeRepository'
import { Like } from '../models'

class LikeService{

    /**
     * isLiked Service
     * @param user_id, follower_id
     */
    async isLiked({ user_id, follower_id }){
        return await likeRepository.isLiked({user_id, follower_id})
    }

    /**
     * Like  Service
     * @param user_id, follower_id
     */
    async like({ user_id, follower_id }){
        const newLike = Like.build({'user_id':user_id, 'follower_id':follower_id})
        return await likeRepository.like({ newLike })
    }

    /**
     * Unlike Service
     * @param like obj
     */
    async unlike({ like }){
        return await likeRepository.unlike({ like })
    }

    /**
     * Most Liked Service
     */
    async mostLiked(){
        return await likeRepository.mostLiked()
    }

}

const likeService = new LikeService()
export default likeService