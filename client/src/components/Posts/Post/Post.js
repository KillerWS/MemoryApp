import React from 'react';
import useStyles from './styles'
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core/';

import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
//一个轻量级的js库，方便了对时间的操作
import moment from 'moment'
import {useDispatch} from 'react-redux'
import { deletePost, likePost } from '../../../actions/posts';
const Post=({post,setCurrentId})=>{
   // const Post=({post})=>{
    const classes=useStyles();
    const dispatch = useDispatch();
    const user=JSON.parse(localStorage.getItem('profile'))
    console.log(post)
    const Likes = () => {
        if (post.likes.length > 0) {
            return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
              ? (
                <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
              ) : (
                <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
              );
          }
      
          return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
    };

    return(
       
        <Card className={classes.card}>
            <CardMedia className={classes.media} image={post.selectedFile} title={post.title}></CardMedia>
            <div className={classes.overlay}>
                <Typography variant='h6'>{post.name}</Typography>
                <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
            </div>

            {/* {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) &&( */}
                {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) &&(
                <div className={classes.overlay2}>
                <Button 
                    style={{color:'white'}} 
                    size="small" 
                    onClick={()=>{
                        //在Home组件中定义-->Posts组件-->Post组件, 现在Post组件可以修改CurrentId的值了
                         setCurrentId(post._id)
                        
                        }}>

                    {/*fontSize="default"已经弃用 <MoreHorizIcon fontSize="default"/> */}
                    {/* 一个...的按钮 */}
                    <MoreHorizIcon fontSize="medium"/>
                </Button>
            </div>
            )}
            
           
           
            <div className={classes.details}>
            {/* 遍历出tags */}
        <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
        {/* <Typography variant="body2" color="textSecondary" component="h2">{post.tags}</Typography> */}
      </div>
      <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
      
      
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
      </CardContent>

      
      <CardContent>
      <CardActions className={classes.cardActions}>
        {/* //<Typography className={classes.cardActions}> */}
        <Button color="primary" disabled={!user?.result} size="small" onClick={()=>dispatch(likePost(post._id))}>
            {/* <ThumbUpAltIcon fontSize="small"/>
            Like &nbsp; 
            {post.likeCount}
            */}
            
          <Likes />
        </Button>
        {/* {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
        <Button size="small" color="secondary" onClick={() => dispatch(deletePost(post._id))}>
          <DeleteIcon fontSize="small" /> Delete
        </Button>
        )} */}
        {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
        <Button size="small" color="secondary" onClick={() => dispatch(deletePost(post._id))}>
          <DeleteIcon fontSize="small" /> Delete
        </Button>
        )}
       
        </CardActions>
      </CardContent>
        </Card>
    )

}

export default Post;