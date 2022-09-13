import React, { useState } from 'react'
import {Avatar,Button, Paper, Grid, Typography, Container, TextField, Icon} from '@material-ui/core'
import LockOutlineIcon from '@material-ui/icons/LockOutlined'
import useStyles from './Mainstyles'
// import Input from './Input'

import { useDispatch, useSelector } from 'react-redux'
import Son from './Son'

const Main = () => {
  const classes = useStyles()
  const initialState={ firstName:'', lastName:'', email:'', password: '', confirmPassword: '' };
  
  const user= useSelector((state)=>(state.user));

  const [form, setForm]=useState(initialState)
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup,setIsSignup]= useState(false);
  const dispatch = useDispatch();

  const handleShowPassword=()=> setShowPassword((prevShowPassword)=>!prevShowPassword);
  
  // const switchMode =() =>  {
  //   setIsSignup((prevIsSignup)=>!prevIsSignup) 
  //   //无论如何都设成密码不可见
  //   setShowPassword(false)
  //   }
    const googleSuccess= async (res) =>{
      console.log(`成功啦啦啦   ${res}`)
      console.log(res)
    }
    const googleError = (error) =>{
      console.log('google登录失败啦,error信息：')
      console.log(error)
    }
    

  const handleSubmit=async(e)=>{
      e.preventDefault();
      console.log("表单提交啦")
      //使用useselector获取数据成功
      console.log(user.name+user.age)
  }
  const handleChange =(e)=>{
      setForm({...form, [e.target.name] : e.target.value})

  }
  const StateChange =(e)=>{
    
    dispatch({type:'userReducerCase1'})
  }

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlineIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">user.name:{user.name}</Typography>
        <Typography component="h1" variant="h5">user.age:{user.age}</Typography>
        <Button fullWidth variant="contained" color="primary" className={classes.submit} onClick={StateChange}>
            Change
          </Button>
        <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                    <Son value1={1}/>
                    {/* <> 
                      
                        
                        <Input name="firstName"  label="First Name" handleChange={handleChange} autoFocus half/>
                        <Input name="lastName"  label="Last Name" handleChange={handleChange} autoFocus half/>
                        
                      
                    </>
                  

              <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
              <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
              <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange}/> */}
            
            </Grid>

            
            
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            submit
          </Button>
             
            
          
        </form>
      </Paper>

    </Container>
  )
}

export default Main