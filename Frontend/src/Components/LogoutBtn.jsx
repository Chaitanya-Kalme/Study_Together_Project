import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../Services/authService'
import { logout } from '../store/authSlice'
import { useNavigate } from 'react-router'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


function LogoutBtn({
    className=""
}) {
    const dispatch= useDispatch()
    const navigate= useNavigate()

    const logoutHandler = () =>{
        authService.logout()
        .then(() =>{
            dispatch(logout())
            toast.success("Logout Successfully")
            setTimeout(() => {
              navigate('/')
            }, 1000);
        })
    }
  return (
    <>
      <div className={className? className: `px-6 py-2 duration-200 hover:bg-orange-400 rounded-full text-2xl`} onClick={logoutHandler}>Logout</div>
      <ToastContainer/>
    </>
  )
}

export default LogoutBtn