import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserModal from "../models/user.js";

const secret = 'test';

//登录的controller
export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    //查找已有的账户记录
    const oldUser = await UserModal.findOne({ email });

    if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });
    
    //返回是不是密码
    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

    //生成token：jwt.sign
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" });
   console.log(req.body)
    console.log(`用户登录: ${req.body}--jwt,sign 生成的token是 ${token} `)
    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

//注册的的controller
export const signup=async(req,res)=>{
    
    const { firstName, lastName,email, password, confirmPassword } = req.body;
   try {
    const oldUser= await UserModal.findOne({email})
    console.log(oldUser)
    //如果再数据库里查询到，就返回用户已存在
    if(oldUser) return res.status(400).json({message:"This email has been already used."})
    
    if(password !== confirmPassword) return res.status(400).json({message:"Passwords don't match."})
    
    //对密码进行加密
    const hashedPassword = await bcrypt.hash(password, 12);

    //创建一个新的UserSchema By .create
    const result = await UserModal.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });

    const token = jwt.sign( { email: result.email, id: result._id }, secret, { expiresIn: "1h" } );

    res.status(201).json({ result, token });
} catch (error) {
    //res.status(500).json({message:error.message})
    res.status(500).json({message:"Something went wrong"}) 
} 
}