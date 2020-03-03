import { User } from '../models'

class UserRepository{

    /**
     * Get User by ID Repository
     * @param id
     */
    async getByID({ id }){
        return await User.findOne({
            attributes:{
                exclude: ['password']
            },
            where:{
                id: id
            }
        });
    }

    /**
     * Get Full User object by ID Repository
     * @param id
     */
    async getFullByID({ id }){
        return await User.findOne({
            where:{
                id: id
            }
        });
    }


    /**
     * Update User password 
     */
    async updateUser({ user }){
        return await user.save()
    }

}

const userRepository = new UserRepository()
export default userRepository