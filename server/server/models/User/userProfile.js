import mongoose from 'mongoose'

const userProfileSchema =mongoose.Schema({
    firstName:String,
    lastName:String,
    email:String,
    phoneNumber:String,
    //将图像用base64转为字符串，所以是string,Avatar
    selectedFile:{
        default:"",
        type:String
    },
});

const UserProfile= mongoose.model('UserProfile', userProfileSchema)

export default UserProfile;
