import jwt from 'jsonwebtoken'
import responseHelper from '../helpers/responseHelper'

export default (req, res, next)=>{
    // get the token from header
    const bearerHeader = req.headers["authorization"]
    
    if (!bearerHeader) return responseHelper.unauthorized(res,"")

    try{
        const token = bearerHeader.split(' ')[1]
        const decoded = jwt.verify(token, "some_secret_key_here")
        req.user = decoded
        next()
    }catch(ex){
        res.status(400).send("Invalid token")
    }
}