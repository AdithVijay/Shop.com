const User = require( "../models/usersModel")

const retrieveUserData = async(req,res)=>{
    const id = req.params.id
    const user =await User.findById(id)
    return res.status(200).json(user)
}
const createUserAddress = async(req,res)=>{
    console.log(req.body);
    
}

module.exports = { retrieveUserData,createUserAddress}