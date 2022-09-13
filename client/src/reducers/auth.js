import { AUTH, LOGOUT } from '../constants/actionTypes';
//state可以指定为空初始化（缺省值）
//因为state要被转换为posts，所以直接全写成posts
// export default (state=[],action) => {
//     ...
//     ...
// }


//reducer函数不用直接使用，它会在dispatch函数中调用!!!
// reducer接受state和action并返回新的state

 const authReducer=(state={authData:null}, action) => {
    switch (action.type) {
      case AUTH:
        console.log('This is reducer auth')
        //把数据存储在localstorage里
        //1、localStorage拓展了cookie的4K限制；
        //2、localStorage会可以将第一次请求的数据直接存储到本地，这个相当于一个5M大小的，针对于前端页面的数据库。
        localStorage.setItem('profile', JSON.stringify({...action?.data}))
        
        return {...state, authData:action?.data}
      
      case LOGOUT:
        //localStorage.removeItem('profile')
        localStorage.clear()
        return {...state, authData:action?.data}

      default:
        return state;
    }
  };

export default authReducer