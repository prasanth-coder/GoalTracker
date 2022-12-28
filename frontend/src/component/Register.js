import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./Register.css"
import { useUserContext } from '../context/userContext';
import { UserContext } from '../context/userContext';
const Register = () => {
    const { registerInfo,setRegisterInfo,handleRegister,error} = useUserContext(UserContext);
    const onChangeHandler = (e) => {
        setRegisterInfo({
            ...registerInfo,
            [e.target.name]: e.target.value,
          });
    }
  return (
    <Box  component="form"
    sx={{
      '& .MuiTextField-root': { m: 1, width: '25ch' },
    }}
    noValidate
    autoComplete="off">
         <div className="container">
        <TextField
          required
          label="Name"
          name = "name"
          value={registerInfo.name || ''}
          onChange={onChangeHandler}
          
        />
        
        
        <TextField
          required
          label="Email"
          name="email"          
          value={registerInfo.email || ''}
          onChange={onChangeHandler}
        />

        
        <TextField
          required
          label="Password"
          type="password"
          name="password"
          value={registerInfo.password || ''}
          onChange={onChangeHandler}
        />
        <Button variant="contained" onClick={handleRegister}>Submit </Button>
        </div>
       {!error.status && <>{error.err}</>}
    </Box>
  )
}

export default Register