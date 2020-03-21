import authRepository from '../../src/repositories/authRepository'
import { User } from '../../src/models'
import { Op } from 'sequelize'

/**
 * Testing login with the wrong credentials
 */
test('Login with the wrong user data! ', async (done) => {
    const user = new User()
    user.username = "test"
    user.password = "test"
    user.email = "testnonexisting@testwrong.com"

    const data = await authRepository.loginUser({user});
    expect(data).toBeNull();
    done()
  });


/**
 * Testing new user registraion
 */
test('Register new user !', async (done) =>{
    const user = {
        "username": "test001",
        "password": "test001",
        "email": "test@001test.com",
        "first_name":"Test001",
        "last_name":"Test001"
    }

    const u = await User.findOne({
        where:{
            [Op.or]: [{username: user.username}, {email: user.email}]
        }
    });

    // Delete previously created user
    if(u != null){
        await u.destroy()
    }
   
    const resp = await authRepository.registerUser({user})
    expect(resp).toBe(true)
    done()
})