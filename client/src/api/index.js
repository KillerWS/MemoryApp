import axios from 'axios';

const API=axios.create({baseURL:'http://localhost:5000'})
//指向后端路由的url
//旧 const url='http://localhost:5000/posts';

export const fetchPosts=() => API.get('/posts');

//字如其名，axios.interceptors拦截器用于一是请求拦截，二是返回拦截。
//用token验证是否logged in
API.interceptors.request.use((req)=>{
    
    if(localStorage.getItem('profile')){
        //把token加入每个request请求中
        req.headers.Authorization=`Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
        //后端会接收到一个特别的header
    return req
})

//把数据通过api发送给后端
export const createPost=(newPost)=>API.post('/posts',newPost);
//更新数据
export const updatePost = (id, updatedPost) => API.patch(`${'/posts'}/${id}`, updatedPost);
//删除帖子
export const delelte =(id)=>API.delete(`${'/posts'}/${id}`);
//点赞加1
export const likePost=(id)=>API.patch(`${'/posts'}/${id}/likePost`);


export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);