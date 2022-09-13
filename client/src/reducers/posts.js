import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';
//state可以指定为空初始化（缺省值）
//因为state要被转换为posts，所以直接全写成posts
// export default (state=[],action) => {
//     ...
//     ...
// }


//reducer函数不用直接使用，它会在dispatch函数中调用!!!
// reducer接受state和action并返回新的state

export default (posts =[], action) => {
    switch (action.type) {
      case FETCH_ALL:
        return action.payload;
      case CREATE:
        return [...posts, action.payload];
      case UPDATE:
      case LIKE:
        console.log("Post info:"+posts)
        return posts.map((post) => (post._id === action.payload._id ? action.payload : post));
      case DELETE:
        return posts.filter((post)=>post._id !== action.payload );    
      default:
        return posts;
    }
  };