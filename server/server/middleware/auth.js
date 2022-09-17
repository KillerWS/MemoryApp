//Auth middleware

import jwt from 'jsonwebtoken'

//wants to like a post
//click the like button => auth middleware(next) =>like controller...
const secret = 'test';
const auth=async(req,res,next)=>{

    console.log('这里是auth middleware--------------')
    console.log(req.headers)
    console.log('------------------')
    try {
        //从axios修饰过的请求中的authorization字段获取token
        const token = req.headers.authorization.split(" ")[1];
        
        const isCustomAuth = token.length < 500;
        
        let decodedData;

        if (token && isCustomAuth) {      
            //普通登录
            decodedData = jwt.verify(token, secret);
            console.log("token显示如下")
            console.log(token)
            console.log("decodedata显示如下")
            console.log(decodedData)
            req.userId = decodedData?.id;
        }else{
            //Google登录验证
            decodedData= jwt.decode(token)
            req.userId= decodedData?.sub;
        }
        
        next();
    } catch (error) {
        console.log(error)
    }
}

export default auth