import authService from '../services/authService'

class AuthBusiness{

    /**
     * Register new user business
     * @param user
     */
    async registerUser({ user }){
        return await authService.registerUser({ user })
    }

    /**
     * Login user business
     * @param user
     */
    async loginUser({ user }){
        return await authService.loginUser({ user })
    }

}

const authBusiness = new AuthBusiness()
export default authBusiness