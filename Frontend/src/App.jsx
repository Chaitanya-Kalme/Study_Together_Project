import { Outlet } from 'react-router'
import './App.css'
import Footer from './Components/Footer.jsx'
import Navbar from './Components/Navbar.jsx'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { login,logout } from './store/authSlice.js'
import authService from './Services/authService.js'

function App() {
  const dispatch = useDispatch()

  useEffect(() =>{
    authService.getCurrentUser()
    .then((response) =>{
      const userData= response.data;
      if(userData){
        dispatch(login(userData))
      }
      else{
        dispatch(logout())
      }
    })
  },[])

  return (
    <>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </>
  )
}

export default App
