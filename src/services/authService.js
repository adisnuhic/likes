import authRepository from '../repositories/authRepository'

class AuthService{

    /**
     * Register new user service
     * @param user
     */
    async registerUser({ user }){
        return await authRepository.registerUser({ user })
    }

    /**
     * Login user service
     * @param user
     */
    async loginUser({ user }){
        return await authRepository.loginUser({ user })
    }

}

const authService = new AuthService()
export default authService