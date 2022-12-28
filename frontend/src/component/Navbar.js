import React from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/userContext';
import { UserContext } from '../context/userContext';
const Navbar = () => {
    const {user,handleLogOut} = useUserContext(UserContext);
    const navigate = useNavigate();
  return (
    
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            Goal Tracker
          </Typography>
          {user ? 
          <>
          <Button color="inherit">{user.name}</Button>
          <Button color="inherit" onClick={handleLogOut}>LogOut</Button>          
          </> : 
          <>
          <Button color="inherit" onClick={() => navigate("/login")}>Login</Button>
          <Button color="inherit" onClick={() => navigate("/")}>Register</Button>
          </>}
          
        </Toolbar>
      </AppBar>
    
  )
}

export default Navbar