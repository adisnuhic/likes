import { Like } from '../models'
import { User } from '../models'
import sequelize, { QueryTypes } from 'sequelize'

class LikeRepository{

    /**
     * isLiked Repository
     * @param user_id, follower_id
     */
    async isLiked({ user_id, follower_id }){
        const liked = await Like.findOne({
            attributes:['user_id','follower_id'],
            where:{
                user_id: user_id,
                follower_id: follower_id
            }
        });

        return liked
    }

    /**
     * Like Repository
     * @param user_id, follower_id
     */
    async like({ newLike }){
        return await newLike.save()
    }

    /**
     * Unlike Repository
     * @param like obj
     */
    async unlike({ like }){
        return await like.destroy()
    }

    /**
     * Most liked Repository
     */
    async mostLiked(){
        // this can be done via ORM but i used here raw sql query    
        const [users, meta ] = await User.sequelize.query("SELECT DISTINCT u.*, COUNT(user_id) AS num_of_likes FROM `Users` AS u INNER JOIN Likes AS l ON u.id = l.user_id GROUP BY u.id ORDER BY num_of_likes DESC")
        return users
    }
}

const likeRepository = new LikeRepository()
export default likeRepository