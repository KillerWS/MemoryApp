

  import React,{useEffect} from 'react'
  import {GoogleLogin} from 'react-google-login'
  import {Button, Icon} from '@material-ui/core'
  import { gapi } from 'gapi-script'
  import {useDispatch} from 'react-redux'

  //import { useHistory } from 'react-router-dom';
  //replaced by useNavigate
  import { useNavigate } from 'react-router-dom'
  import useStyles from './styles'
import { AUTH } from '../../constants/actionTypes'

  const Google_log = () => {
    const classes = useStyles()

    //dispatch reducers
    const  dispatch=useDispatch()

    const navigate=useNavigate()

    useEffect(() => {
        function start() {
          gapi.client.init({
            clientId: "20521068448-qc63tjr0ub065rv0knnl9gr1818744t4.apps.googleusercontent.com",
            scope: 'email',
          });
        }
    
        gapi.load('client:auth2', start);
      }, []);

    const googleSuccess= async (res) =>{
        console.log("成功"+res)
        const result=res?.profileObj
      //创建token
      const token= res?.tokenId;

      try {
        dispatch({type:AUTH,data:{result,token}})
        
        //自动刷新
        navigate('/')
      } catch (error) {
        console.log(error)
      }
      }
      const googleError = (error) =>{
        console.log('google登录失败啦,error信息：')
        console.log(error)
      }
    return (
        <GoogleLogin
        clientId="20521068448-qc63tjr0ub065rv0knnl9gr1818744t4.apps.googleusercontent.com"
        render={(renderProps)=>(
          <Button 
          className={classes.googleButton} 
          color='primary' fullWidth 
          onClick={renderProps.onClick} 
          disabled={renderProps.disabled} 
          startIcon={<Icon/>} 
          variant="contained">
            Google Sign In
          </Button>
        )}
        onSuccess={googleSuccess}
        onFailure={googleError}
        cookiePolicy="single_host_origin"
    />
    )
  }
  
  export default Google_log