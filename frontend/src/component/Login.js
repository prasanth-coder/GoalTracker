import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useUserContext } from '../context/userContext';
import { UserContext } from '../context/userContext';

const Login = () => {
  const { loginInfo,error,setLoginInfo,handleLogIn} = useUserContext(UserContext);
  const onChangeHandler = (e) => {
    setLoginInfo({
        ...loginInfo,
        [e.target.name]: e.target.value,
      });
}
  return (
    <div>
       <Box  component="form"
    sx={{
      '& .MuiTextField-root': { m: 1, width: '25ch' },
    }}
    noValidate
    autoComplete="off">
         <div className="container">
         
         <TextField
          required
          label="Email"
          name = "email"
          value={loginInfo.email || ''}
          onChange={onChangeHandler}
        />

        
        <TextField
          required
          label="Password"
          type="password"
          name = "password"
          value={loginInfo.password || ''}
          onChange={onChangeHandler}
        />
        <Button variant="contained" onClick={handleLogIn}>Submit </Button>
        </div>
       {!error.status && <>{error.err}</>}
    </Box>


    </div>
  )
}

export default Login