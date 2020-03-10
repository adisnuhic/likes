import likeRepository from '../repositories/likeRepository'


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
     * @param newLike
     */
    async like({ newLike }){
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