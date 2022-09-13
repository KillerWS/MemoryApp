import mongoose from 'mongoose'

const postSchema =mongoose.Schema({
    title:String,
    message:String,
    creator:String,
    tags:[String],
    //将图像用base64转为字符串，所以是string
    selectedFile:String,
    likes:{
       // type:Number,
       //default:0
        type:[String],
        default:[]
    },
    createAt:{
        type:Date,
        default:new Date()
    },


});

const PostMessage = mongoose.model('PostMessage',postSchema)

export default PostMessage;