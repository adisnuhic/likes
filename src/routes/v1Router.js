import express from 'express'
import authController from '../controllers/authController'
import meController from '../controllers/meController'
import userController from '../controllers/userController'

const v1Router = express()


v1Router.use('/auth', authController())
v1Router.use('/me', meController())
v1Router.use('/user', userController())


v1Router.get('/ping', (req, res) =>{
    res.json({
        code: 200,
        message: 'PONG',
        data:[]
    })
})

export default v1Router