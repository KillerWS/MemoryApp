import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js'

export const getPosts= async(req,res)=>{
    
    try {
        //使用mongoose对象直接find所有
        //因为find等方法从模型内部查找东西需要时间
        const postMessage =await PostMessage.find();
        //console.log(postMessage)
       
        res.status(200).json(postMessage)
    } catch (error) {
        res.status(404).json({message:error.message})
        
    }
}
//完成
export const createPost=async (req,res)=>{
    const post= req.body
    console.log('This is createPost, req.body参数:')
   console.log(post)
   //post创建时就直接把creator直接赋值为创建者的req.userId,这样其他的用户就无法删除
   const newPostMessage = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() })
 
    try {
        await newPostMessage.save();
        
        res.status(201).json(newPostMessage);
    } catch (error) {
        //409: Conflict
        res.status(409).json({message:error.message})
    }
}

export const updatePost=async(req,res)=>{
    console.log('param参数'+req.params._id)
    const {id:_id} =req.params;
    
    const post =req.body
    //console.log('id查询:'+PostMessage.ObjectId)
    console.log('更新数据库查询字段_id:'+_id)
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

   // const updatedPost =await PostMessage.findByIdAndUpdate(_id,post,{new: true})
    const updatedPost =await PostMessage.findByIdAndUpdate(_id,{...post, _id},{new: true})
    res.json(updatedPost)

}

export const deletePost=async(req,res)=>{
    const {id} =req.params;
    
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

    await PostMessage.findByIdAndRemove(id);

    res.json({message: 'Post deleted successfully'});

}

//完成
export const likePost=async(req,res)=>{

    const {id} =req.params;
    console.log("req.userId显示如下")
    console.log(req.userId)
    if(!req.userId) return res.json({message:'Unauthenticated'})
    
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');
    const post =await PostMessage.findById(id)
    
    console.log(post)
    const index = post.likes.findIndex((id) => id ===String(req.userId));
    console.log(`index是  ${index}`)
    if (index === -1) {
        post.likes.push(req.userId);
      } else {
        post.likes = post.likes.filter((id) => id !== String(req.userId));
      }
     //const index= post.likes.findIndex((id)=> id === String(req.userId))
    
    // if(index === -1){
    //     //like the post 
    //     post.likes.push(req.userId);
    // }else{
    //     //dislike the post
    //     post.likes=post.likes.filter((id)=>id !== String(req.UserId));
    // }

    //返回修改后的文档而不是原始文档。默认为假 new:true 默认为false
    // const updatedPost = await PostMessage.findByIdAndUpdate(id,{likeCount:post.likeCount+1},{new:true});
    //console.log(post)
   const updatedPost = await PostMessage.findByIdAndUpdate(id,post,{new:true});
    
    res.json(updatedPost);

}