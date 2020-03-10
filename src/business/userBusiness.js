import userService from '../services/userService'
import bcrypt from 'bcryptjs'


class UserBusiness{

    /**
     * Get User by ID Business
     * @param id 
     */
    async getByID({ id }){
        return await userService.getByID({ id })
    }


    /**
     * Update User Password
     * @param user
     */
    async updatePassword({ id, current_password, new_password }){
        const user = await userService.getFullByID({ id })
        const ok = await bcrypt.compare(current_password, user.password)

        if(ok){
            const hash = await bcrypt.hash(new_password, 10);
            user.password = hash
            return await userService.updateUser({ user })    
        }

        return null
        
    }

}

const userBusiness = new UserBusiness()
export default userBusiness