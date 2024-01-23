import * as api from '../api';
import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';
//api.fetchPosts

//Action Creators (他们是返回action的函数)
//use redux-thunk here: async(dispatch)=> 使用异步等待功能
export const getPosts=()=>async(dispatch)=>{

    //一个简单的action ，payload存储帖子的数据
    // const action={type:'FETCH_ALL',payload:[]}
    // return action;

    try {
        //in try , fetch all data from api
        //一般来说 Data 代表的是帖子
        //此处fetch出来的数据是后台的数据！
        const {data}= await api.fetchPosts();

        //把后台fetch出来的data(数据库里的内容)通过payload:data发送数据
        //次数使用dispatch(action对象)是因为redux thunk
        //相当于把数据更新到前端模型react/redux，不直接访问数据
        dispatch({type:FETCH_ALL,payload:data})
    } catch (error) {
        console.log(error.message);
    }

    //const action ={type:'FETCH_ALL',payload:[] }

    //dispatch(action) ;

}

export const createPost=(post)=>async(dispatch)=>{
    console.log("测试策划")
    console.log(post)
    try {
        const {data}= await api.createPost(post);
        dispatch({type:CREATE,payload:data});
    } catch (error) {
        console.log(error.message);
    }


}

 export const updatePost = (id, post) => async (dispatch) => {
   try {
    const { data } = await api.updatePost(id, post);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deletePost =(id) =>async(dispatch)=>{
    try {
         //await api.delelte(id)
         //console.log("degeltepost");
        //dispatch({type:'TEST2',payload:id})
        //await api.delelte(id)
        await api.delelte(id)
        dispatch({type:DELETE,payload:id})
    } catch (error) {
        console.log(error.message);
    }


};

export const likePost=(id)=>async(dispatch)=>{
    try {
        const {data}=await api.likePost(id)
        dispatch({ type: LIKE, payload: data });
    } catch (error) {
        console.log(error.message);
    }

}