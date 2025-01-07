import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../Services/authService'
import { logout } from '../store/authSlice'

function LogoutBtn({
    className=""
}) {
    const dispatch= useDispatch()

    const logoutHandler = () =>{
        authService.logout()
        .then(() =>{
            dispatch(logout())
            window.alert("Logout Successfully")
        })
    }
  return (
    <div className={className? className: `px-6 py-2 duration-200 hover:bg-orange-400 rounded-full text-2xl`} onClick={logoutHandler}>Logout</div>
  )
}

export default LogoutBtn