import userRepository from '../../src/repositories/userRepository'
import { User } from '../../src/models'
import { Op } from 'sequelize'

/**
 * Testing get user by ID that does not exists in DB
 */
test("Test get user by ID that does not exists", async(done) => {
    const id = 100000
    const user = await userRepository.getByID({id})
    expect(user).toBeNull()
    done()
})

