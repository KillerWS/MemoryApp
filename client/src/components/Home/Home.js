import Posts from "../Posts/Posts";
import Form from '../Form/Form'
import {Container ,Grow,Grid} from '@material-ui/core'
import React,{useState,useEffect} from "react";

import { useDispatch } from "react-redux";
import {getPosts} from '../../actions/posts'


const Home = () => {
    
    const dispatch =useDispatch();
    const [currentId, setCurrentId]=useState(0);


    //React 会保存你传递的函数（我们将它称之为 “effect”），并且在执行 DOM 更新之后调用它。
    //接受第二个参数来控制跳过执行，下次 render 后如果指定的值没有变化就不会执行，这里是dispatch
    useEffect(()=>{
        dispatch(getPosts());
    },[dispatch])
    
    //test如下，不写action,直接dispatch：
    // useEffect(()=>{
    //     console.log('不写action,直接dispatch')
    //     dispatch({type:})
    // })

    //,[currentId,dispatch]
  return (
    <Grow in >
        <Container>
        <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
    
            <Grid item xs={12} sm={7} >
                {/* 要去在form和posts之间共享帖子的currentId所以要去父组件:App */}
                <Posts setCurrentId={setCurrentId}/>
                
            </Grid >
            <Grid item xs={12} sm={4} >
                <Form currentId={currentId}  setCurrentId={setCurrentId}/>
               
            </Grid >


        </Grid>
        </Container>


    </Grow>
  )
}

export default Home