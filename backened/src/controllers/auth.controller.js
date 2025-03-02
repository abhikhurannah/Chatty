import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import { generateToken } from '../lib/utils.js';
import cloudinary from '../lib/cloudinary.js';


export const signup = async (req,res)=>{
    console.log(req.body+" accha");
    const {fullname, email, password} =req.body;
  try{
    if(!fullname || !email || !password){
        return res.status(400).json({message: "All fields are required"})
    }
    if(password.length <6){
        return res.status(400).json({message: "Password must be at least 6 characters long"})
    }
    const user = await User.findOne({email});
    if(user){
        return res.status(400).json({message: "User already exists"})
    }
    const salt =await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)
    const newUser = new User({fullname, email, password:hashedPassword})

    if(newUser){
       //generate jwt token
       generateToken(newUser._id,res);
       await newUser.save();

       res.status(201).json({
        _id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
        profilePic: newUser.profilePic
       });
    }
    else{
        return res.status(400).json({message: "invalid user data"})
    }
  }catch(e){
     console.log("error in signup controller",e.message);
     res.status(500).json({message: "server error"})
  }
}
export const login = async(req,res)=>{
    const {email,password} = req.body;
    try{
      if(!email ||!password){
        return res.status(400).json({message: "All fields are required"})
      }
      const user = await User.findOne({email});
      if(!user){
        return res.status(401).json({message: "Invalid credentials"})
      }
      const isMatchpassword = await bcrypt.compare(password,user.password)
      if(!isMatchpassword){
        return res.status(401).json({message: "Invalid credentials"})
      }
      //generate jwt token
      generateToken(user._id,res);
      res.json({
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        profilePic: user.profilePic
       });
    }
    catch(e){
        console.log("error in login controller",e.message);
        res.status(500).json({message: "server error"})
    }
}
export const logout =(req,res)=>{ 
    try{
      res.cookie("jwt","",{maxAge:0});
      res.status(500).json({message: "Logged out successfully"})
    }catch(e){
        console.log("error in logout controller",e.message);
        res.status(500).json({message: "server error"})
    }
}
export const updateProfile = async (req,res)=>{
    try {
        const {profilePic} = req.body;
        const userId = req.user._id;

        if(!profilePic){
            return res.status(400).json({message: "profilePic is required"})
        }
        const uploadresponse = await cloudinary.uploader.upload(profilePic)
        const updatedUser = await User.findByIdAndUpdate(userId, {profilePic: uploadresponse.url}, {new: true});
        res.status(200).json(updatedUser)
        
    } catch (error) {
        console.log("error in updateProfile controller", error.message);
        res.status(500).json({message: "server error"}) 
        
    }
}
export const checkAuth = async (req,res)=>{
    try {
        res.status(200).json(req.user)
    } catch (error) {
        console.log("error in checkAuth controller", error.message);
        res.status(500).json({message: "server error"}) 
        
    }
}