const jwt = require('jsonwebtoken');
const User = require('../modals/userModal');

const protect = async(req,res,next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer') ){
    try{
        token = req.headers.authorization.split(' ')[1];
        console.log(token)
        const decode = jwt.verify(token,process.env.JWT_SECRET);
        req.user = await User.findById(decode.id).select('-password');

        next();
       }
       catch(err){
        console.log(err);
        return res.status(401).json({ err : 'Not Authorized, Wrong Token'});
        
       }
    
        
    }

    if(!token){
        return res.status(401).json({ msg : 'Not Authorized, No Token'});
        
    }
    }
 

module.exports = {protect}