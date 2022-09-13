const initialState = {name: 'Chris', age:18 };


export default (state = {authdata: null,initialState }, action)=>{
    switch(action.type){
        case 'userReducerCase1':
            console.log("TEST1信息：")
            return { ...state, name: "修改过后的名字：Chrisyyy" };
        
        //不加默认返回的话 : Uncaught Error: The slice reducer for key "user" returned undefined during initialization.
        //If the state passed to the reducer is undefined, you must explicitly return the initial state. 
        //The initial state may not be undefined. 
        //If you don't want to set a value for this reducer, you can use null instead of undefined.
        default:
            return state;

    }

}