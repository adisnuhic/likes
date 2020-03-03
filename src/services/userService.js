import userRepository from '../repositories/userRepository'
import bcrypt from 'bcryptjs'
import responseHelper from '../helpers/responseHelper'

class UserService{

    /**
     * Get User by ID Service
     * @param id 
     */
    async getByID({ id }){
        return await userRepository.getByID({ id })
    }


    /**
     * Update User Password
     * @param user
     */
    async updatePassword({ id, current_password, new_password }){
        const user = await userRepository.getFullByID({ id })
        const ok = await bcrypt.compare(current_password, user.password)

        if(ok){
            const hash = await bcrypt.hash(new_password, 10);
            user.password = hash
            return await userRepository.updateUser({ user })    
        }

        return null
        
    }

}

const userService = new UserService()
export default userService