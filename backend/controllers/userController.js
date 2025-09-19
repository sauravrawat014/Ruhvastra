import userModel from "../models/userModel.js";
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET);
}


const loginUser = async(req,res)=>{

    try{
    const {email,password} = req.body;

    const user = await userModel.findOne({email});

    if(!user){
        return res.json({success:false, message:"User Does Not Exist"});
    }

    const match = await bcrypt.compare(password, user.password);
    if(match){
        const token = createToken(user._id);
        return res.json({success:true, token});
    } else{
        return res.json({success:true, message:"Please Enter A Correct Password"});
    }
} catch(error){
    console.log(error);
    return res.json({success:false, message:error.message});
}

}

const registerUser = async(req,res)=>{

    try{

    const {name, email, password} = req.body;
    const exist = await userModel.findOne({email});

    if(exist){
        return res.json({success:false, message:"User already exist"});
    }

    if(!validator.isEmail(email)){
        return res.json({success:false, message:"Please Enter A Valid Email"});
    }

    if(password.length<8){
        return res.json({success:false, message:"Please Enter A Strong Password"});
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password,salt);

    const newUser = new userModel({
        name,
        email,
        password:hashPassword
    });

    const user = await newUser.save();

    const token = createToken(user._id);
    res.json({success:true, token});

} catch(error){
    console.log(error);
    res.json({success:true, message:error.message});

}


}

const adminLogin = async(req,res)=>{

    try{

        const {email,password} = req.body;

        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password, process.env.JWT_SECRET);
            res.json({success:true, token});
        } else{
            res.json({success:false, message:"Invalid credentials"});
        }

    } catch(error){
        console.log(error);
    res.json({success:true, message:error.message});

    }

}



export {loginUser, registerUser, adminLogin};