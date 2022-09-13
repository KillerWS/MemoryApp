import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import {AppBar,Avatar,Button,Toolbar,Typography} from '@material-ui/core'
import useStyles from './styles'
import memories from '../../images/memories.jpg'
import {useDispatch} from 'react-redux'
import { useNavigate,useLocation } from 'react-router-dom'
const Navbar = () => {
    const classes = useStyles();
    const dispatch=useDispatch()
    const naviage=useNavigate()
    const location=useLocation()
    
    //通常可以尝试zai Navbar添加user读取数据进行交互
    const [user,setUser]=useState(JSON.parse(localStorage.getItem('profile')))
    console.log(user)
    
    const Logout=()=>{
        dispatch({type:'LOGOUT'})
        naviage('/')
        setUser(null)
    }

    //useEffect第二个参数：useEffect 是 componentDidMount，componentDidUpdate 和 componentWillUnmount 三者的结合
//所以他的作用就是组件初始化，组件卸载，组件每次更新时执行
//而每次更新都执行会有多余的不必要执行，所以就有了第二个参数数组每次update的时候这个数组里值变化了就会执行，但这只是update阶段，初始化还是会执行
    useEffect(()=>{
        const token=user?.token;
        //JWT...
        setUser(JSON.parse(localStorage.getItem('profile')))
    // },[localStorage.getItem('profile')])
  },[location])

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer} >
            <Typography component={Link} to="/" className={classes.heading} varaint="h2" align="center">Memories</Typography>
            <img className={classes.image} src={memories} alt="memories" height="60"></img>
            </div>
            

            <Toolbar className={classes.toolbar}>

                {/* 如果登录就展示sth */}
        {user?(
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
            <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
            <Button variant="contained" className={classes.logout} color="secondary" onClick={Logout}>Logout</Button>
          </div>
        ) : (
          <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
        )}
      </Toolbar>

        </AppBar>
  )
}

export default Navbar