import React from 'react'
import GoalContextProvider from "./context/goalContext"
import Register from './component/Register'
import Login from './component/Login'
import Navbar from "./component/Navbar"
import ErrorPage from './component/ErrorPage'
import UserContextProvider from './context/userContext'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Welcome from './component/Welcome'
const App = () => {
  return (
    <>
    <Router>
    <UserContextProvider>
      <GoalContextProvider>
        <Navbar />     
        <Routes>
          <Route path="/welcome" element={<Welcome />}/>
          <Route path="/"  element={<Register />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="*" element={<ErrorPage />}/>
        </Routes>
       
      </GoalContextProvider>        
    </UserContextProvider>
    </Router>
    </>
  )
}

export default App