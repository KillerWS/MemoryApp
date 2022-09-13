import * as api from '../api';
import { AUTH } from '../constants/actionTypes';

export const signin=(formData,navigate)=>async(dispatch)=>{
    try {
        //log in the user, 返回的data包含result和生成的token
        const {data}=await api.signIn(formData)
        console.log("前端actions,输出后端返回的result和token")
        // console.log(data.result)
        // console.log(data.token)
        dispatch({type:AUTH,data})
        navigate('/')
    } catch (error) {
        console.log(error)
    }
}

export const signup=(formData,navigate)=>async(dispatch)=>{
    try {
        //sign in the user
        console.log("sign in the user in client")
        console.log(formData)
        const {data}=await api.signUp(formData)
        dispatch({type:AUTH,data})
        navigate('/')
    } catch (error) {
        console.log(error)
    }
}