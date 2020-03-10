import userRepository from '../repositories/userRepository'
import bcrypt from 'bcryptjs'


class UserService{

    /**
     * Get User by ID Service
     * @param id 
     */
    async getByID({ id }){
        return await userRepository.getByID({ id })
    }


    /**
     * Update User 
     * @param user
     */
    async updateUser({ user }){
        return await userRepository.updateUser({ user })    
    }

    /**
     *  Get full by ID service
     * @param id
     */
    async getFullByID({ id }){
        return await userRepository.getFullByID({ id })
    }

}

const userService = new UserService()
export default userService