
import mongoose from 'mongoose'

const accountInfoSchema =mongoose.Schema({
    loginCredentials:{
        type:[String],
        default:""
    },
    email:String,
    phoneNumber:String,
    //将图像用base64转为字符串，所以是string,Avatar
    selectedFile:String,
    createDate:{
        type:Date,
        default:new Date()
    }
});

const AccountInfo= mongoose.model('AccountInfo', accountInfoSchema)

export default AccountInfo;
