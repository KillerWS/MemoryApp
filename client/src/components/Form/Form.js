import React,{useState,useEffect} from 'react';
import { TextField, Button, Typography,Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import useStyles from './styles'
import { createPost, updatePost } from '../../actions/posts';
import {useDispatch,useSelector} from 'react-redux'
//Get the current ID of post

const Form =({currentId,setCurrentId})=>{

    const errorinfo =true;

    const [postData, setPostData] = useState({ title: '', message: '', tags: '', selectedFile: '' });
  const post = useSelector((state) => (currentId ? state.posts.find((message) => message._id === currentId) : null));
  console.log(post)
  const dispatch = useDispatch();
  const classes = useStyles();
  
  //从localStorage中获取数据
  const user=JSON.parse(localStorage.getItem('profile'))

  useEffect(() => {
    if (post){setPostData(post);}
  }, [post]);
  //到底是写[post]还是[]呢
    
     const handleSubmit=(e)=>{
            e.preventDefault();
            if(currentId===0){
                 //如果currentId值为0的话创建新帖子
                dispatch(createPost({...postData, name: user?.result?.name}))
                clear();
                
            }else{
                //创建新帖子
               
                dispatch(updatePost(currentId,{...postData, name: user?.result?.name}))
                clear();
            }

            clear();
            //dispatch(createPost(postData))
    };

    const clear = () => {
        setCurrentId(0);
        setPostData({  title: '', message: '', tags: '', selectedFile: '' });
      };

      if(!user?.result?.name){
        return(
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    Please Sign In to create your own memories and like other's memories 
                </Typography>
            </Paper>
        )
      }



    return(
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
            <Typography variant="h6">Creating a Memory</Typography>
            
            
            {/* <TextField 
            name="creator" 
            variant="outlined" 
            label="Creator" 
            fullWidth
            value={postData.creator}
            // 设置 creator,加上...postData意味着所有数据都会被保留
            onChange={(e)=>setPostData({
                //写法: creator:e.target.value 一改变就会触发OnChange会重置整个数组，但是因为其他属性没有设置所以会只保存creator的设置
                ...postData,creator:e.target.value
            })}></TextField> */}


            <TextField 
            name="title" 
            variant="outlined" 
            label="Title" 
            fullWidth
            value={postData.title}
            onChange={(e)=>setPostData({
                ...postData,title:e.target.value
            })}></TextField>
            <TextField 
            name="message" 
            variant="outlined" 
            label="Message"
            multiline
            rows={6}
            maxRows={10} 
            fullWidth
            value={postData.message}
            onChange={(e)=>setPostData({
                ...postData,message:e.target.value
                
                
            })}
            helperText={false?"Incorrect entry.":""}
            ></TextField>
            <TextField 
            name="tags" 
            variant="outlined" 
            label="Tags" 
            fullWidth
            value={postData.tags}
            onChange={(e)=>setPostData({
                //...postData,tags:e.target.value
                //帖子标签的功能，加上split后会变成数组
                ...postData, tags:e.target.value.split(',')
            })}></TextField>
            <div className={classes.fileInput}>
                <FileBase
                    type="file"
                    multiple={false}
                    onDone={({base64})=>setPostData({...postData,selectedFile:base64})}
                ></FileBase>

            </div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
           <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
           
            </form>
        </Paper>
    //  <Paper className={classes.paper}>
    //  <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
    //    <Typography variant="h6">Creating a Memory</Typography>
    //    <TextField name="creator" variant="outlined" label="Creator" fullWidth value={postData.creator} onChange={(e) => setPostData({ ...postData, creator: e.target.value })} />
    //    <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
    //    <TextField name="message" variant="outlined" label="Message" fullWidth multiline rows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
    //    <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
    //    <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
    //    <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
    //    <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
//      </form>
//    </Paper>
    
    )
}
export default Form;