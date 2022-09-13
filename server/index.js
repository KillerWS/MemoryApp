import express from 'express'
//发送跨域请求
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import {database} from './server/database/db.js' ;
import postRoutes from './server/routes/posts.js';
import userRoutes from './server/routes/user.js'

import { createNewAcc } from './server/controllers/falseAuth.js';
import dotenv from 'dotenv'
const app =express();
dotenv.config();
app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cors());

app.use('/posts',postRoutes)
app.use('/user',userRoutes)

//数据库连接地址(local/cloud)
//const CONNECTION_URL='mongodb+srv://zzuser:wcz521@cluster0.mwdqb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

//在许多环境中，作为一种约定，您可以设置环境变量PORT以告知Web服务器要监听的端口。
//因此，process.env.PORT || 3000意味着：环境变量PORT中的任何内容，如果没有，则为3000。
const PORT =process.env.PORT || 5000;
//设置新的url解析器和拓扑, useNewUrlParser: true, useUnifiedTopology: true并非必须但是不设置控制台会有错误
mongoose.connect(process.env.CONNECTION_URL_NEW,{ useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>app.listen(PORT,()=>console.log(`Server running on port : ${PORT}`)))
    .catch((error)=> console.log(error.message));

//mongoose.set('useFindAndModify',false);