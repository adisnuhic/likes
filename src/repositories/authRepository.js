import { User } from '../models'
import { Op } from 'sequelize'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

class AuthRepositroy{

    /**
     * Register user repository
     * @param user
     */
    async registerUser({ user }){
        const userExists = await User.findOne({
            where:{
                [Op.or]: [{username: user.username}, {email: user.email}]
            }
        });

        if(userExists == null){
            const hash = await bcrypt.hash(user.password, 10);
            
            // Build models
            const newUser = User.build({
                email: user.email,
                password: hash,
                username: user.username,
                firstName: user.first_name,
                lastName: user.last_name
            });
            
            // Save models
            await newUser.save()
            
            return true
        }

        return false

    }

    /**
     * Login user repository
     * @param user
     */
    async loginUser({ user }){
        const us = await User.findOne({
            where:{
                username: user.username
            }
        })
        
        if(us !== null){ 
            const ok = await bcrypt.compare(user.password, us.password)
            if(ok){
                return await jwt.sign({ id: us.id }, 'some_secret_key_here')
            }
        }
        
        return null
    }

}

const authRepository = new AuthRepositroy()
export default authRepository