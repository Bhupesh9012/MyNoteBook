var jwt = require('jsonwebtoken');
const JWT_SECRET='Hello i am young Lord';

const fetchuser =(req,res,next)=>{
    //Get the user from the jwt token and add id to req object
    const token =req.header('auth-token');
    console.log(token)
    if(!token){
    res.status(401).send({error:"please authenticate using a valid token"})
    }
    try {
    const data =jwt.verify(token,JWT_SECRET);
    req.user = data.user;
    next();
    } catch (error) {
        res.status(401).send({error:"Please authenticate using a valid token"})
    }
   
}
module.exports = fetchuser;