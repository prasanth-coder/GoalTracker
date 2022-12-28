const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../modals/userModal')
const registerUser = async (req,res) => {
    const {name,email,password} = req.body;
    if(!name || !email || !password){
        return res.status(400).json({err : "Please Fill All The Fields"})
    }

    const userExists = await User.findOne({email});

    if(userExists){
        return res.json({status : false,err : "User Already Exists"});
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);

    //create user
    const user = await User.create({
        name,
        email,
        password : hashedPassword
    })

    if(user){
        return res.status(201).json({status : true,msg : "User Created SuccessFully"})
        
    }
    else{
        return res.status(200).json({status : false,msg : "Invalid User Data"})
    }
    
   
}

const loginUser = async (req,res) => {
    const {email,password} = req.body;

    const user = await User.findOne({email});

    if(user && (await bcrypt.compare(password,user.password))){
        const userInfo = {
            id : user._id,
            name : user.name,
            email : user.email,
            token : generateToken(user._id)
        }
      return res.json({
        userInfo,
        status : true,
        msg : "Login Successful"
      })
    }
    else{
        return res.status(404).json({status : false,err : "Invalid User Data"})
    }

    //res.json({message : "Login User"})
}

const getMe = async (req,res) => {
    const {_id,email,name} = await User.findById(req.user.id);

    return res.status(200).json({_id ,name,email})
}

// generate Token

const generateToken = (id) => {
  return jwt.sign({id},process.env.JWT_SECRET,{
    expiresIn : '20d'
  })
}

module.exports = {
    registerUser,
    loginUser,
    getMe
}