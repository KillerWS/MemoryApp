import { combineReducers } from "redux";
import posts from "./posts.js";
import testReducer from "./testReducer.js";
import userReducer from "./userReducer"
import auth from "./auth";
export default combineReducers({
    posts:posts,
    test:testReducer,
    user:userReducer,
    auth
    
})