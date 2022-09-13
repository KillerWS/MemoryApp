import mongoose from 'mongoose';
import AccountInfo from '../models/User/accountInfo.js';
//创建新账户
export const createNewAcc=async(req,res)=>{
    // const {id}=req.params
    // if(!mongoose.Types.ObjectId.isValid)
    console.log("This is createNewAcc")
    const acc={
        email:"495032sda@qq.com",
        phoneNumber:"123123",
    //将图像用base64转为字符串，所以是string,Avatar
        selectedFile:"sssss",
    }
    //const {id}=req.params;
    //const acc=req.body
    const newAcc = new AccountInfo(acc);
    
    try {
        await newAcc.save();
        res.status(201).json(newAcc)
    } catch (error) {
        //409: Conflict
        res.status(409).json({message:error.message})
    }
    
}

export const updateAccInfo=async(req,res)=>{
    
}