import React from 'react';
import Post from './Post/Post'
import useStyles from './styles'
import { useSelector } from 'react-redux';
import {Grid, CircularProgress} from '@material-ui/core'

const Posts=({ setCurrentId })=>{

 
    const classes=useStyles();
    // 有一个回调函数,返回state.posts
    //回调函数(a)=>a.counter 第一个参数是reducer的实例
    const posts = useSelector((state) => state.posts);
    console.log('使用useSelector在前端取得帖子(posts)的数据');
    // console.log(Object.prototype.toString.call(posts));
    console.log(posts);
    //const testData = useSelector((state) => state.test);
    //console.log(testData);
    
    return(
        //!posts.length
        !posts.length ? <CircularProgress/>:(
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {posts.map((post) => (
          <Grid key={post._id} item xs={12} sm={6} md={6}>
            <Post post={post} setCurrentId={setCurrentId} />
            
          </Grid>
        ))}
        
        </Grid>
        )
        
        
        
    );

};

export default Posts;